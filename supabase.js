import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pavqfszqmpbdicesddag.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhdnFmc3pxbXBiZGljZXNkZGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5OTQxNTcsImV4cCI6MjA1ODU3MDE1N30.H6mszTy4q06QYc6-9-lTUyBODFLxiwUe0RUh92WRxRg"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
