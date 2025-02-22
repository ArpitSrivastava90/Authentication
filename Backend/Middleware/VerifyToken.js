import jwt from "jsonwebtoken";
export const VerifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(400).json({
      success: false,
      message: "Unauthorized - no token provided",
    });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode)
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("error in verifying JWt", error);
    throw new Error("Error in verifying token ", error);
  }
};
