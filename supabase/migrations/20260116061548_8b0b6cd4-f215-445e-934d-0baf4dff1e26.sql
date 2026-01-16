-- Add explicit INSERT policy to prevent user inserts on compatibility_scores
-- Compatibility scores should only be created by backend processes (edge functions/service role)
CREATE POLICY "Prevent user inserts on compatibility scores"
ON public.compatibility_scores FOR INSERT
TO authenticated
WITH CHECK (false);

-- Note: service_role bypasses RLS by default, so edge functions can still insert scores