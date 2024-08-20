import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};
export default generateTokenAndSetCookie;

export const generateTokenAndSetHeader = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.setHeader("Authorization", `Bearer ${token}`);
  // Optionally, you might also want to include some metadata about expiration in the response body
  res.json({ message: "Token set in headers", expiresIn: "15d" });
};

// Fetch example
// fetch('/your-endpoint')
// .then(response => {
//   const token = response.headers.get('Authorization').replace('Bearer ', '');
//   // Store token in localStorage or some secure place
//   localStorage.setItem('jwt', token);

//   return response.json();
// })
// .then(data => {
//   console.log(data.message); // 'Token set in headers'
//   // Handle expiration or other client-side logic here
// })
// .catch(error => {
//   console.error('Error:', error);
// });
