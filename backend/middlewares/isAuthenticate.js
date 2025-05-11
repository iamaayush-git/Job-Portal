import jwt from "jsonwebtoken"

const isAuthentiate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found"
      })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      })
    }

    req.user = decode;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export default isAuthentiate;