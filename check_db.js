const url = 'https://idmahdsxhuapffkquapa.supabase.co/rest/v1/master_tenants?id=eq.39e88a4f-4758-4431-8d90-83b56692b524&select=cms_db';
const options = {
  method: 'GET',
  headers: {
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWFoZHN4aHVhcGZma3F1YXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MzA3MTgsImV4cCI6MjEwNzAwNjcxOH0.qGHXwe6RbF084Y6jq8YJy30D0QWbRsaQ97MJFc35rtA',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWFoZHN4aHVhcGZma3F1YXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0MzA3MTgsImV4cCI6MjEwNzAwNjcxOH0.qGHXwe6RbF084Y6jq8YJy30D0QWbRsaQ97MJFc35rtA'
  }
};
fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(JSON.stringify(json).substring(0, 500)))
  .catch(err => console.error('error:' + err));
