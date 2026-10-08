const SUPABASE_URL = 'https://idmahdsxhuapffkquapa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWFoZHN4aHVhcGZma3F1YXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MzA3MTgsImV4cCI6MjEwNzAwNjcxOH0.qGHXwe6RbF084Y6jq8YJy30D0QWbRsaQ97MJFc35rtA';

if (typeof supabase !== 'undefined') {
  window.CMS_SUPABASE = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase Client Initialized!");
} else {
  console.warn("Supabase CDN failed to load.");
  window.CMS_SUPABASE = null;
}
