# You Can Live Test
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="script.js"></script>
</head>

<body style="background-color: #27292d; color: white;">
    <h1>Hello World!</h1>
    <a style="color: white;"
        href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={putt yout client id}&scope=openid email profile&redirect_uri=http://localhost:5500">Login
        with Google</a> 
        <!-- ye humko authorization code dega aur usse hmm it token fetch karenge  -->
</body>

</html>
```


```js
const code = new URLSearchParams(location.search).get("code"); // ye url se hmm code ko direct le le rahe hai 
const clientId =
  "putt {yout client id}";
const clientSecret = "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";
const redirectUrl = "http://localhost:5500";

// Note these clientID and secret not work put you id and secret ;

if (code) {
  fetchIdToken();
}

async function fetchIdToken() {
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

  const userToken = data.id_token.split(".")[1]; // ye jwt hai 
  const userData = JSON.parse(atob(userToken)); // yaha parse kiye ja rah ahai  google se data lene ke liye 
  console.log(data);
  console.log(userData);
}

```