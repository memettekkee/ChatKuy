import express from 'express'
import jwt from 'jsonwebtoken'

// Memperluas interface Request untuk menyimpan user ID
declare global {
    namespace Express {
      interface Request {
        user?: {
          id: string;
          email: string;
        };
      }
    }
  }

  const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    try {
      // Ambil token dari header Authorization
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          message: 'Akses ditolak. Token tidak ditemukan.'
        });
        return 
      }
  
      // Ekstrak token dari format "Bearer [token]"
      const token = authHeader.split(' ')[1];
      
      // Verifikasi token
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET || 'default_jwt_secret'
      ) as {
        id: string;
        email: string;
        iat: number;
        exp: number;
      };
      
      // Tambahkan data user ke request untuk digunakan di controller
      req.user = {
        id: decoded.id,
        email: decoded.email
      };
      
      // Lanjutkan ke handler berikutnya
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ 
          success: false, 
          message: 'Invalid token !' 
        }); 
        return 
      }
      
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ 
          success: false, 
          message: 'Expired token !' 
        }); 
        return 
      }
      
      console.error('Auth error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
      return 
    }
  };
  
  export default verifyToken;