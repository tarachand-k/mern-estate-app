import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = (req, res) => {
  console.log(req.userId);

  return res
    .status(200)
    .json({ success: true, message: "You are authenticated" });
};

export const shouldBeAdmin = (req, res) => {
  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid Token!" });

    console.log(payload);
    if (!payload.isAdmin)
      return res
        .status(403)
        .json({ success: false, message: "Not authorized!" });

    return res
      .status(200)
      .json({ success: true, message: "You are authenticated" });
  });
};
