import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import { generateRememberMeToken, generateToken } from '../utils/tokenUtils.js';

export const signIn = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = rememberMe ? generateRememberMeToken(user) : generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,     // 👈 must be false for local HTTP testing
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 30 days or 1 hour
      sameSite: 'lax', // helps with CSRF protection, adjust as needed
    });

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
