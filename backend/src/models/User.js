import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'teacher', 'counselor'],
      default: 'teacher'
    },
    schoolName: String
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
