//const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const token = req.header("x-auth-token");
//   // Check for token
//   if (!token)
//     return res.status(401).json({ msg: "No token, authorinzation denied" });
//   try {
//     // verify token
//     const decoded = jwt.verify(token, process.env.JWTSECRET);
//     // Add user from payload
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ msg: "Token is not valid" });
//   }
// };

const notFound = (req, res, next) => {
  const error = new Error(
    `Not Found  !!!!! :))))______!!!!!!!!  ${req.originalUrl}`
  );
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  // res.json({
  //   message: error.message,
  //   stack:
  //     process.env.NODE_ENV === "production" ? "In production" : error.stack,
  // });
};

module.exports = {
  notFound,
  errorHandler,
};
