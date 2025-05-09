// Replace with your actual Supabase project URL and anon key
const SUPABASE_URL = 'https://cutfpylzqmoipiaomred.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1dGZweWx6cW1vaXBpYW9tcmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MDU1MTUsImV4cCI6MjA2MjM4MTUxNX0.QTi9DO5eYgHYDodLX09ZqoY2pEZPcRySHRMclZWVC2M';

// Create Supabase client (avoid name conflict with global)
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fetch the currently reading book for a user
async function fetchCurrentlyReading(userId) {
  const { data, error } = await client
    .from('currently_reading')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching currently reading book:', error.message);
    return null;
  }

  console.log('Fetched data:', data);
  return data;
}

// Display the currently reading book info
async function displayCurrentlyReading() {
  const { data: { user }, error } = await client.auth.getUser();

  if (error || !user) {
    console.log('User is not authenticated');
    document.getElementById('login-form').style.display = 'block';
    return;
  }

  const bookData = await fetchCurrentlyReading(user.id);

  if (bookData) {
    document.getElementById('book-title').textContent = bookData.title;
    document.getElementById('book-author').textContent = bookData.author;
    document.getElementById('book-cover').src = bookData.cover_url;
    document.getElementById('book-thoughts').textContent = bookData.thoughts;
    document.getElementById('book-link').href = bookData.purchase_link;
    document.getElementById('page-progress').textContent = `${bookData.page_current} / ${bookData.page_total}`;
  }
}

// Handle user login
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    console.error('Login failed:', error.message);
    alert('Login failed. Check your email/password.');
  } else {
    console.log('User logged in:', data.user);
    document.getElementById('login-form').style.display = 'none';
    displayCurrentlyReading();
  }
}

// Handle logout
async function logout() {
  const { error } = await client.auth.signOut();
  if (error) {
    console.error('Logout failed:', error.message);
  } else {
    console.log('User logged out');
    window.location.reload();
  }
}

// Handle user registration
async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await client.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Registration failed:', error.message);
    alert('Registration failed: ' + error.message);
  } else {
    console.log('Registration successful:', data);
    alert('Registration successful! Please check your email to confirm your account.');
  }
}


// Run on page load
document.addEventListener('DOMContentLoaded', async () => {
  const { data, error } = await client.auth.getUser();

  if (data?.user) {
    displayCurrentlyReading();
  } else {
    console.log('No user logged in');
    document.getElementById('login-form').style.display = 'block';
  }
});
