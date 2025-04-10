import jwt from 'jsonwebtoken';

export const generateRememberMeToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, icon: user.icon, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '30d', // longer expiration for remember me
  });
};

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, icon: user.icon, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  };
