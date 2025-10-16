import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import DOMPurify from 'npm:isomorphic-dompurify@2.9.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const newsletterSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  content: z.string().min(1, 'Content is required').max(10000, 'Content must be less than 10000 characters'),
  preview: z.string().max(200, 'Preview must be less than 200 characters').optional()
});

interface NewsletterRequest {
  subject: string;
  content: string;
  preview?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get auth header from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized - No authorization header' 
      }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const body: NewsletterRequest = await req.json();

    // Validate input
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: validation.error.errors[0].message 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { subject, content, preview } = validation.data;

    // Initialize Supabase client with anon key for role checking
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    // Create client with user's auth header to check their role
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication error:', authError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized - Invalid token' 
      }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Check if user has admin role
    const { data: isAdmin, error: roleError } = await supabaseAuth.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError || !isAdmin) {
      console.error('Role check error:', roleError, 'User ID:', user.id);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Forbidden - Admin access required' 
      }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log('Admin user verified:', user.email);

    // Initialize Supabase client with service role for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get all active email subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from('email_subscriptions')
      .select('email, name')
      .eq('is_active', true);

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError);
      throw new Error('Failed to fetch subscribers');
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'No active subscribers found' 
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize HTML content to prevent XSS
    const sanitizedContent = DOMPurify.sanitize(content);

    // Send newsletter to all subscribers
    const emailPromises = subscribers.map(async (subscriber) => {
      const personalizedContent = sanitizedContent.replace(
        '{{name}}', 
        subscriber.name || 'Little Dreamer'
      );

      return resend.emails.send({
        from: "Snoozies Sweet Dreams Weekly <onboarding@resend.dev>",
        to: [subscriber.email],
        subject: subject,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${subject}</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #e6f3ff; margin-bottom: 30px; }
                .logo { font-size: 24px; font-weight: bold; color: #4a90e2; margin-bottom: 10px; }
                .tagline { color: #666; font-style: italic; }
                .content { margin: 30px 0; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px; }
                .unsubscribe { color: #999; text-decoration: none; }
                .button { display: inline-block; background: #4a90e2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="logo">🌙 Snoozies Dreamy Haven</div>
                <div class="tagline">Sweet Dreams Weekly Newsletter</div>
              </div>
              
              <div class="content">
                ${personalizedContent}
              </div>
              
              <div class="footer">
                <p>Sweet dreams! 🌟</p>
                <p>This email was sent to ${subscriber.email}</p>
                <p><a href="#" class="unsubscribe">Unsubscribe</a></p>
              </div>
            </body>
          </html>
        `,
      });
    });

    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    console.log(`Newsletter sent: ${successful} successful, ${failed} failed`);

    return new Response(JSON.stringify({
      success: true,
      message: `Newsletter sent to ${successful} subscribers`,
      stats: { successful, failed, total: subscribers.length }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error sending newsletter:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
