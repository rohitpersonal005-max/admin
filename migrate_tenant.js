const fs = require('fs');

const storeContent = fs.readFileSync('js/store.js', 'utf8');

const match = storeContent.match(/(const INITIAL_SEED = \{[\s\S]*?\n\s*\};\s*\n\s*const EMPTY_DATABASE =)/);
if (!match) {
  console.error("Could not find INITIAL_SEED");
  process.exit(1);
}

let script = match[1].replace('const EMPTY_DATABASE =', '');
// We also need ENTERPRISE_USERS since INITIAL_SEED might reference it? Wait, INITIAL_SEED is just a literal object.
// But if there are variables inside? No, it's a literal.

let INITIAL_SEED;
eval('INITIAL_SEED = ' + script.replace('const INITIAL_SEED = ', ''));

const url = 'https://idmahdsxhuapffkquapa.supabase.co/rest/v1/master_tenants?id=eq.39e88a4f-4758-4431-8d90-83b56692b524';
const options = {
  method: 'PATCH',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWFoZHN4aHVhcGZma3F1YXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MzA3MTgsImV4cCI6MjEwNzAwNjcxOH0.qGHXwe6RbF084Y6jq8YJy30D0QWbRsaQ97MJFc35rtA',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWFoZHN4aHVhcGZma3F1YXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MzA3MTgsImV4cCI6MjEwNzAwNjcxOH0.qGHXwe6RbF084Y6jq8YJy30D0QWbRsaQ97MJFc35rtA',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  },
  body: JSON.stringify({ cms_db: INITIAL_SEED })
};

fetch(url, options)
  .then(res => {
    if (!res.ok) throw new Error('HTTP error ' + res.status);
    console.log("Successfully migrated data to tenant 39e88a4f-4758-4431-8d90-83b56692b524");
  })
  .catch(err => console.error('Error:', err));

