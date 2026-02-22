import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const register = async (req, res) => {
  const { name, email, password, role, schoolName } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role, schoolName });
  res.status(201).json({ token: signToken(user._id), user: { id: user._id, name, email, role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};
