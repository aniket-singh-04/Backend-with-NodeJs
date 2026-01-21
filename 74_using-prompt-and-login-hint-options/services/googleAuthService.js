import { OAuth2Client } from "google-auth-library";

const clientId = "you client id";
const clientSecret = "Your client Secret";
const redirectUrl = "http://localhost:4000/auth/google/callback";

const client = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: redirectUrl,
});

const userKnownEmail = "user@gmail.com"

export function generateGoogleAuthUrl() {
  return client.generateAuthUrl({
    scope: ["email", "profile", "openid"],
    prompt: "consent",
    login_hint: `${encodeURIComponent(userKnownEmail)}`,
    // login_hint is an optional parameter you can pass when initiating an OAuth 2.0 or OpenID Connect login with Google.
    // It’s used to pre-fill or suggest the user’s email address during the login flow.
    // This is especially useful if:
    // You already know the user’s Google account (e.g., from a previous session).
    // You want to avoid asking them to re-enter their email.
    // You want to streamline the login experience.
  });
}

export async function fetchUserFromGoogle(code) {
  console.log("Running fetchIdToken function...");

  const { tokens } = await client.getToken(code);
  console.log(tokens);

  const loginTicket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });

  const userData = loginTicket.getPayload();
  return userData;
}
