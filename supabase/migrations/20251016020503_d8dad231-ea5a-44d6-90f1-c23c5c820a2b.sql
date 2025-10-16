-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: Only admins can manage roles
CREATE POLICY "Only admins can view roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix email_subscriptions RLS policies
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view all subscriptions" ON public.email_subscriptions;

-- Add admin-only policy for viewing all subscriptions
CREATE POLICY "Only admins can view all subscriptions"
ON public.email_subscriptions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Update stories table RLS policies
DROP POLICY IF EXISTS "Authenticated users can insert stories" ON public.stories;
DROP POLICY IF EXISTS "Authenticated users can update stories" ON public.stories;
DROP POLICY IF EXISTS "Authenticated users can delete stories" ON public.stories;

-- Create admin-only policies for stories management
CREATE POLICY "Only admins can insert stories"
ON public.stories
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update stories"
ON public.stories
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete stories"
ON public.stories
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));