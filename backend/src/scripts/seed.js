import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Attendance from '../models/Attendance.js';
import Mark from '../models/Mark.js';
import Intervention from '../models/Intervention.js';

dotenv.config();
await connectDB();

await Promise.all([
  User.deleteMany({}),
  Student.deleteMany({}),
  Attendance.deleteMany({}),
  Mark.deleteMany({}),
  Intervention.deleteMany({})
]);

const admin = await User.create({
  name: 'District Admin',
  email: 'admin@govschool.local',
  password: await bcrypt.hash('Admin@123', 10),
  role: 'admin',
  schoolName: 'Govt Model School'
});

const students = await Student.insertMany([
  {
    fullName: 'Asha Devi',
    age: 14,
    gender: 'Female',
    classGrade: '8',
    schoolName: 'Govt Model School',
    familyIncomeRange: 'Low (Below Poverty Line)',
    parentEducationLevel: 'Primary',
    distanceFromSchoolKm: 6,
    accessToTransportation: false,
    previousAcademicPerformance: 48,
    previousFailures: 1,
    behavioralFlags: 2
  },
  {
    fullName: 'Ravi Kumar',
    age: 15,
    gender: 'Male',
    classGrade: '9',
    schoolName: 'Govt Model School',
    familyIncomeRange: 'Medium',
    parentEducationLevel: 'Secondary',
    distanceFromSchoolKm: 2,
    accessToTransportation: true,
    previousAcademicPerformance: 72,
    previousFailures: 0,
    behavioralFlags: 0
  }
]);

await Attendance.insertMany([
  { student: students[0]._id, date: new Date(), status: 'absent' },
  { student: students[0]._id, date: new Date(Date.now() - 86400000), status: 'present' },
  { student: students[1]._id, date: new Date(), status: 'present' }
]);

await Mark.insertMany([
  { student: students[0]._id, subject: 'Math', term: 'Term 1', score: 40 },
  { student: students[1]._id, subject: 'Science', term: 'Term 1', score: 78 }
]);

await Intervention.create({
  student: students[0]._id,
  interventionType: 'Counseling Session',
  notes: 'Met guardian and discussed attendance concerns',
  outcome: 'Follow-up scheduled',
  followUpRequired: true,
  createdBy: admin._id
});

console.log('Seed complete');
process.exit(0);
