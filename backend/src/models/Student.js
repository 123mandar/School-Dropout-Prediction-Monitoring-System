import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    age: Number,
    gender: String,
    classGrade: String,
    schoolName: String,
    parentGuardianName: String,
    contactNumber: String,
    address: String,
    familyIncomeRange: String,
    parentEducationLevel: String,
    distanceFromSchoolKm: Number,
    accessToTransportation: Boolean,
    enrollmentDate: Date,
    previousAcademicPerformance: Number,
    healthIssues: String,
    previousFailures: { type: Number, default: 0 },
    behavioralFlags: { type: Number, default: 0 },
    latestRiskScore: { type: Number, default: 0 },
    latestRiskCategory: {
      type: String,
      enum: ['Low Risk', 'Medium Risk', 'High Risk'],
      default: 'Low Risk'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
