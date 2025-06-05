import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({
        message: "No token provided , Not Authorized",
        success: false,
      });
    }
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (
      token_decoded !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(403).json({
        message: "Forbidden, Not Authorized",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export default adminAuth;
// This middleware checks if the request has a valid admin token.