const accessToken ="your access token";
const response = await fetch(
  `https://openidconnect.googleapis.com/v1/userinfo?access_token=${accessToken}`
  // {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // }
);

const userData = await response.json();

console.log(userData);
