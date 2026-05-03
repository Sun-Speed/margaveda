import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    // 🔥 check token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied",
      });
    }

    // 🔥 extract token
    const token = authHeader.split(" ")[1];

    // 🔥 verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 🔥 attach user
    req.user = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }

};

export default authMiddleware;