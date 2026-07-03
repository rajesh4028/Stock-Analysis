// Supabase client + authentication helpers, shared by login.html and index.html.
// Requires config.js (SUPABASE_CONFIG) and the supabase-js UMD bundle to be
// loaded first (see the <script> tags in the HTML pages).

let sb = null;

function initSupabase() {
  if (sb) return sb;
  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error("Supabase library failed to load.");
    return null;
  }
  if (!isSupabaseConfigured()) {
    return null;
  }
  sb = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return sb;
}

// Returns the current logged-in user object, or null. Reads the locally stored
// session (fast, no network round-trip) so it is safe to use as a page guard.
async function getCurrentUser() {
  const client = initSupabase();
  if (!client) return null;
  const { data, error } = await client.auth.getSession();
  if (error || !data.session) return null;
  return data.session.user;
}

async function signUpUser(email, password, companyName) {
  const client = initSupabase();
  if (!client) throw new Error("Supabase is not configured yet.");
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { company_name: companyName || "" } },
  });
  if (error) throw error;
  return data; // data.session is null when email confirmation is required
}

async function signInUser(email, password) {
  const client = initSupabase();
  if (!client) throw new Error("Supabase is not configured yet.");
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function sendPasswordReset(email) {
  const client = initSupabase();
  if (!client) throw new Error("Supabase is not configured yet.");
  const redirectTo = window.location.href.replace(/[^/]*$/, "login.html");
  const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
}

async function signOutUser() {
  const client = initSupabase();
  if (!client) return;
  await client.auth.signOut();
}
