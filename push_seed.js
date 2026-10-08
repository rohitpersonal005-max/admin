const fs = require('fs');

let storeJS = fs.readFileSync('js/store.js', 'utf8');
storeJS = 'const localStorage = { getItem:()=>null, setItem:()=>{}, removeItem:()=>{} };\n' + storeJS;
storeJS = storeJS.replace('window.CMS_STORE = new Store();', '');
storeJS += '\n\nmodule.exports = { INITIAL_SEED };\n';

fs.writeFileSync('temp_store.js', storeJS);

const { INITIAL_SEED } = require('./temp_store.js');

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
    console.log("SUCCESSFULLY MIGRATED DATA!");
  })
  .catch(err => console.error('Error:', err));

