// import jwt from "jsonwebtoken"

// export const verifyToken = async (req, res, next) => {
//     try {
//         let [key, token] = req.headers.token.split(' , ')
//         if (key == "") {
//             jwt.verify(token, 'myNameIsAnan', async (err, decoded) => {
//                 if (err) return res.status(401).json({ message: "invalid token", err })
//                 req.user = decoded
//                 next()
//             })
//         }

//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// } 


import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: "Access denied. No token provided." 
      });
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET || 'myNameIsAnan', (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            message: "Token has expired"
          });
        }
        
        return res.status(401).json({
          success: false,
          message: "Invalid token",
          error: err.message
        });
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export { verifyToken };