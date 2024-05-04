import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid Token!" });

    req.userId = payload.id;
  });

  next();
};
