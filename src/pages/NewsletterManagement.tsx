import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { supabase } from '../integrations/supabase/client'
import { useToast } from '../hooks/use-toast'
import { Send, Users, Mail, Calendar, Star } from 'lucide-react'

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  recentSubscribers: number;
}

export default function NewsletterManagement() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [stats, setStats] = useState<NewsletterStats | null>(null)

  // Fetch subscriber stats
  const fetchStats = async () => {
    try {
      const { data: allSubscribers } = await supabase
        .from('email_subscriptions')
        .select('*')

      const { data: activeSubscribers } = await supabase
        .from('email_subscriptions')
        .select('*')
        .eq('is_active', true)

      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data: recentSubscribers } = await supabase
        .from('email_subscriptions')
        .select('*')
        .gte('subscribed_at', thirtyDaysAgo.toISOString())
        .eq('is_active', true)

      setStats({
        totalSubscribers: allSubscribers?.length || 0,
        activeSubscribers: activeSubscribers?.length || 0,
        recentSubscribers: recentSubscribers?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  // Load stats on component mount
  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  const sendNewsletter = async () => {
    if (!subject || !content) {
      toast({
        title: "Missing Information",
        description: "Please provide both subject and content.",
        variant: "destructive"
      })
      return
    }

    setIsSending(true)

    try {
      const response = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject,
          content,
        }
      })

      if (response.error) {
        throw response.error
      }

      const result = response.data
      
      toast({
        title: "Newsletter Sent! 🎉",
        description: result.message || "Your newsletter has been delivered to all subscribers.",
      })

      // Clear form
      setSubject('')
      setContent('')
      
    } catch (error: any) {
      console.error('Error sending newsletter:', error)
      toast({
        title: "Send Failed",
        description: error.message || "Failed to send newsletter. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSending(false)
    }
  }

  const insertSampleTemplate = () => {
    setSubject("🌙 Sweet Dreams Weekly - New Bedtime Stories Inside!")
    setContent(`<h2>Hello {{name}}! 🌟</h2>

<p>Welcome to this week's collection of dreamy bedtime stories from Snoozies Haven!</p>

<h3>✨ New Stories This Week:</h3>
<ul>
  <li><strong>The Sleepy Cloud's Journey</strong> - Follow a little cloud as it drifts across the night sky</li>
  <li><strong>The Moonbeam Garden</strong> - Discover a magical garden that only blooms under moonlight</li>
  <li><strong>The Cozy Bear's Lullaby</strong> - A gentle bear helps forest friends fall asleep</li>
</ul>

<h3>💤 Bedtime Tip of the Week:</h3>
<p>Try creating a "worry jar" where little ones can write down their worries before bed and leave them outside their room. This helps clear their minds for peaceful sleep!</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="https://your-app-url.com/stories" class="button">Listen to New Stories</a>
</div>

<h3>🌙 Sweet Dreams Quote:</h3>
<p><em>"Dreams are the playground where imagination comes to life while we sleep peacefully under the stars."</em></p>

<p>Sweet dreams and happy listening! 💤</p>

<p>With love,<br/>The Snoozies Team</p>`)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Mail className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground">Please log in to access newsletter management.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Newsletter Management</h1>
          <p className="text-muted-foreground">Send Sweet Dreams Weekly to your subscribers</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeSubscribers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recentSubscribers}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Newsletter Composer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Compose Newsletter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject Line</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="🌙 Sweet Dreams Weekly - New Stories Inside!"
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Newsletter Content</label>
                <Button
                  onClick={insertSampleTemplate}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  Use Template
                </Button>
              </div>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your newsletter content here... You can use {{name}} to personalize with subscriber names."
                className="min-h-[300px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tip: Use HTML formatting and name placeholders for personalization
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={sendNewsletter}
                disabled={isSending || !subject || !content}
                className="flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {isSending ? 'Sending...' : 'Send Newsletter'}
              </Button>
              
              {stats && (
                <p className="text-sm text-muted-foreground self-center">
                  Will send to {stats.activeSubscribers} active subscribers
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}