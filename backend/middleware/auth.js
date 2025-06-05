import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        message: "No token provided, authorization denied",
      });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Initialize req.body if it doesn't exist (for GET requests)
    if (!req.body) {
      req.body = {};
    }

    req.body.userId = decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

export default authUser;
