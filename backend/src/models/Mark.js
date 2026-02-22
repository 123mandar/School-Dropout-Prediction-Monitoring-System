import mongoose from 'mongoose';

const markSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    term: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Mark', markSchema);
