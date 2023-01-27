import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  //get the token from the header if present
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(JSON.stringify(token));
  //if no token found, return response (without going to the next middelware)
  if (!token)
    return res
      .status(403)
      .json({ error: true, message: "Access Denied: No token provided" });

  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req.user = tokenDetails;
    console.log(req.user);
    req.userId = tokenDetails._id;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(403)
      .json({ error: true, message: "Access Denied: Invalid token" });
  }
};

export default auth;
