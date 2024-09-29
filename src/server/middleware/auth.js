import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  console.log("yoo");
  console.log(req.authorization);
  next();
};
