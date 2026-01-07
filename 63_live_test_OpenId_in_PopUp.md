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
const clientSecret = ""; // your secrete 
const redirectUrl = "http://localhost:5500";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid email profile&redirect_uri=${redirectUrl}`;

button.addEventListener("click", () => {
  window.open(authUrl, "auth-popup", "width=500,height=600"); // ye new window open karega jist name auth-popup hai aur uska widht hai 
});

window.addEventListener("message", ({ data }) => {// ye message ko listen karega 
  fetchIdToken(data.code); // aur ish function dega 
});

if (window.name === "auth-popup") {
  console.log("Running localhost:5500 inside the popup...");
  const code = new URLSearchParams(location.search).get("code");
  if (code) {
    window.opener.postMessage({ code }); // ye opern window ko message send karga 
    window.close(); // ye window ko close karega 
  }
}

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