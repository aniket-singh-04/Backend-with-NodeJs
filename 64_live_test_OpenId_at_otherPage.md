```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="script.js" defer></script>
</head>

<body style="background-color: #27292d; color: white;">
    <h1>Hello World!</h1>
    <button>Open Popup</button>
</body>

</html>
```

```js
const button = document.querySelector("button");

const clientId = " "; // your client id 
const clientSecret = " "; // your secrete 
const redirectUrl = "http://localhost:5500/callback.html";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600");
});

window.addEventListener("message", ({ data }) => {
  fetchIdToken(data.code);
});

async function fetchIdToken(code) {
  console.log("Running fetchIdToken function...");
  const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  const data = await response.json();
  if (data.error) {
    console.log("Error occurred");
    console.log(data);
    return;
  }

  const userToken = data.id_token.split(".")[1];
  const userData = JSON.parse(atob(userToken));
  console.log(data);
  console.log(userData);
}
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="callback.js"></script>
</head>

<body>
    <h1>Google Callback</h1>
</body>

</html>
```

```js
const code = new URLSearchParams(location.search).get("code");
if (code) {
  window.opener.postMessage({ code });
  window.close();
}
```