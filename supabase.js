import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://xhrrvwkzacsruqshudfm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhocnJ2d2t6YWNzcnVxc2h1ZGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1Mzg2MTQsImV4cCI6MjA0MTExNDYxNH0.09fm7_L3pd7fmHaQ8aADPOUmeABD-sgtZ5bjO41Oimw';


export const supabase = createClient(supabaseUrl, supabaseAnonKey);