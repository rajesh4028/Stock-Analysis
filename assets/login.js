// Page logic for login.html — handles the Sign In / Create Account tabs,
// form submission, password reset, and redirecting to the app on success.

(function () {
  const form = document.getElementById("authForm");
  const submitBtn = document.getElementById("submitBtn");
  const companyRow = document.getElementById("companyRow");
  const messageEl = document.getElementById("authMessage");
  const tabs = document.querySelectorAll(".auth-tab");
  const forgotLink = document.getElementById("forgotLink");
  const configWarning = document.getElementById("configWarning");

  let mode = "login"; // or "register"

  // Apply the saved theme so the login page matches the app.
  (function initTheme() {
    const saved = localStorage.getItem("complianceChecklist_theme");
    const preferred = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", preferred);
  })();

  if (!isSupabaseConfigured()) {
    configWarning.classList.remove("hidden");
    submitBtn.disabled = true;
    return;
  }

  // If already signed in, skip straight to the app.
  getCurrentUser().then((user) => {
    if (user) window.location.replace("index.html");
  });

  function showMessage(text, type) {
    messageEl.textContent = text;
    messageEl.className = "auth-message " + (type || "");
  }

  function clearMessage() {
    messageEl.textContent = "";
    messageEl.className = "auth-message hidden";
  }

  function setMode(newMode) {
    mode = newMode;
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.mode === mode));
    if (mode === "register") {
      companyRow.classList.remove("hidden");
      submitBtn.textContent = "Create Account";
      document.getElementById("password").setAttribute("autocomplete", "new-password");
    } else {
      companyRow.classList.add("hidden");
      submitBtn.textContent = "Sign In";
      document.getElementById("password").setAttribute("autocomplete", "current-password");
    }
    clearMessage();
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.mode)));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessage();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const company = document.getElementById("companyName").value.trim();

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Please wait…";

    try {
      if (mode === "register") {
        const data = await signUpUser(email, password, company);
        if (data.session) {
          // Email confirmation is disabled — user is signed in immediately.
          window.location.replace("index.html");
          return;
        }
        showMessage(
          "Account created! Please check your email to confirm your address, then sign in.",
          "success"
        );
        setMode("login");
      } else {
        await signInUser(email, password);
        window.location.replace("index.html");
        return;
      }
    } catch (err) {
      showMessage(err.message || "Something went wrong. Please try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  forgotLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    if (!email) {
      showMessage("Enter your email above first, then click 'Forgot password?'.", "error");
      return;
    }
    try {
      await sendPasswordReset(email);
      showMessage("If that email is registered, a password reset link is on its way.", "success");
    } catch (err) {
      showMessage(err.message || "Could not send reset email.", "error");
    }
  });
})();
