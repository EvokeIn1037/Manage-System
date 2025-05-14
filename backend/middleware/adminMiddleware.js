import jwt from 'jsonwebtoken';

const adminMiddleware = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return res.json({ admin: decoded.admin, report: decoded.report });
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid or expired' });
  }
};

export default adminMiddleware;
