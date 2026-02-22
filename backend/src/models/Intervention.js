import mongoose from 'mongoose';

const interventionSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    interventionType: { type: String, required: true },
    notes: String,
    date: { type: Date, default: Date.now },
    outcome: String,
    followUpRequired: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Intervention', interventionSchema);
