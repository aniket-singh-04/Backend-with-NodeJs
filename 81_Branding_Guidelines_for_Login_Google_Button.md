# Branding Guidelines for **Login with Google** Button

> ⚠️ **Important**
> Google is very strict about branding.
>  
> If you violate these rules:
> - Your OAuth app can be **rejected**
> - Your app can be **blocked**
> - Your company can fail compliance review
>
> These rules are **NOT optional**.

---

## WHY BRANDING GUIDELINES EXIST

Google wants:
- Users to **trust** the login
- Clear distinction between **Google login** and **your app**
- No misleading UI or fake association

That’s why the button design is controlled.

---

## OFFICIAL BUTTON NAME (MANDATORY)

You must use **exact wording**:

✔️ **“Sign in with Google”**  
✔️ **“Log in with Google”**

❌ “Login using Gmail”  
❌ “Continue with Google Account”  
❌ “Google Login”  

No creativity allowed.

---

## OFFICIAL GOOGLE LOGO USAGE

### Allowed logo:
- Google “G” logo only
- Provided by Google
- Correct colors
- No distortion

❌ Do NOT:
- Change colors
- Stretch
- Rotate
- Add effects
- Animate the logo

---

## BUTTON COLOR RULES

Google allows **only these button styles**:

### 1. White Button (Recommended)
- White background
- Gray border
- Colored Google “G”
- Black or dark gray text

### 2. Blue Button
- Google Blue background
- White text
- White Google “G”

❌ No custom colors  
❌ No gradients  
❌ No dark mode improvisation  

---

## BUTTON SIZE & SHAPE RULES

- Rectangular shape
- Rounded corners (small radius)
- Adequate padding
- Must be clearly visible

❌ Too small  
❌ Icon-only buttons  
❌ Hidden or secondary placement  

---

## TEXT & FONT RULES

- Use **Google Sans** if possible
- Otherwise, use clean sans-serif
- Text must be readable
- Proper spacing between logo and text

❌ Decorative fonts  
❌ Uppercase forced text  
❌ Emoji usage  

---

## PLACEMENT GUIDELINES

✔️ Place button:
- Near other login options
- In a visible and accessible area

❌ Do NOT:
- Place Google login more prominent than your own app branding
- Mislead user into thinking Google endorses your app

---

## MULTIPLE LOGIN PROVIDERS RULE

If you show multiple providers:

✔️ Display them **equally**
✔️ Same size buttons
✔️ Same visual priority

❌ Highlight Google more than others

---

## ACCESSIBILITY REQUIREMENTS

- Sufficient color contrast
- Keyboard accessible
- Screen reader friendly
- Clear clickable area

Accessibility violations = rejection.

---

## WHAT YOU MUST NOT SAY (LEGAL ISSUE)

❌ “Google Verified Login”  
❌ “Official Google Login”  
❌ “Secure Google Authentication”

Google does NOT endorse your app.

---

## EXAMPLE: CORRECT HTML (BASIC)

```html
<a href="/auth/google" class="google-btn">
  <img src="google-g-logo.svg" alt="Google logo" />
  <span>Sign in with Google</span>
</a>
```

---

## EXAMPLE: BASIC CSS (COMPLIANT)

```css
.google-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  color: #3c4043;
  text-decoration: none;
  font-family: Arial, sans-serif;
}

.google-btn img {
  height: 18px;
  margin-right: 8px;
}
```

---

## COMMON REASONS APPS GET REJECTED

❌ Modified Google logo  
❌ Wrong button text  
❌ Misleading branding  
❌ Fake endorsement claims  
❌ Poor accessibility  

---

## INTERVIEW-SAFE EXPLANATION

> “Google enforces strict branding rules for its login button to prevent user confusion and false endorsement. The logo, text, colors, and placement must follow Google’s official guidelines.”

Say this confidently.

---

## FINAL VERDICT

✔️ Follow Google branding exactly  
✔️ No creativity  
✔️ No shortcuts  
✔️ Compliance over aesthetics  

Ignore branding → OAuth rejection.

---

END.
