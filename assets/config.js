// ─────────────────────────────────────────────────────────────────────────────
//  Supabase configuration
//
//  Fill in the two values below from your Supabase dashboard:
//    Project → Settings → API
//      1. "Project URL"        → SUPABASE_URL
//      2. "anon"  "public" key → SUPABASE_ANON_KEY  (a long token starting eyJ...)
//
//  Both of these are SAFE to keep in front-end code / a public repo — the anon
//  key only allows actions permitted by your Row-Level Security policies.
//
//  NEVER put the "service_role" key or your database password here.
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_CONFIG = {
  url: "https://qsvidxlhfvueosficsyt.supabase.co",
  anonKey: "sb_publishable_E9dNQf35eqxFGELKS_TDEQ_VOaRWhjS",
};

// Returns true once real values have been filled in above.
function isSupabaseConfigured() {
  return (
    SUPABASE_CONFIG.url &&
    SUPABASE_CONFIG.anonKey &&
    !SUPABASE_CONFIG.url.startsWith("PASTE_") &&
    !SUPABASE_CONFIG.anonKey.startsWith("PASTE_")
  );
}
