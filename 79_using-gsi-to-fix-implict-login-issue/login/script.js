// Google OAuth Client ID (from Google Cloud Console)
const clientId =
  "594555697613-18p3s2o6hl7mvc3gj0o2a2bg7b27tj9m.apps.googleusercontent.com";

// This runs once the page is fully loaded
window.onload = function () {

  // Initialize Google Identity Services (GSI)
  google.accounts.id.initialize({
    client_id: clientId,

    // Callback runs after Google returns a login response
    callback: (response) => {
      console.log(response);

      // `credential` contains the Google ID token (JWT)
      // This token is sent to the backend for verification
      if (response.credential) {
        loginUserWithIdToken(response.credential);
      } else {
        console.log("Something went wrong!");
      }
    },

    // NOTE:
    // If auto_select is not disabled, Google may
    // automatically sign in previously logged-in users
    // auto_select: false, // ← add this to prevent implicit login
  });

  // Render the Google Sign-In button in the UI
  google.accounts.id.renderButton(
    document.getElementById("google-login"),
    {
      theme: "filled_blue",
      shape: "pill",
    }
  );

  // This triggers Google One Tap / auto sign-in
  // Calling this on page load can cause IMPLICIT LOGIN
  // Remove or delay this call if you want explicit login only
  google.accounts.id.prompt();
};

// Sends the Google ID token to the backend for verification
async function loginUserWithIdToken(idToken) {
  const baseURL = "http://localhost:4000";

  const response = await fetch(`${baseURL}/auth/google`, {
    credentials: "include", // allows cookies / sessions to be sent
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // Send ID token to backend
    body: JSON.stringify({ idToken }),
  });

  // If backend verifies token successfully
  if (response.status === 200) {
    // Redirect user after successful login
    // location.href = "/";
  }
}
