import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} }

}, { minimize: false })


const doctorModel = mongoose.models.doctorModel || mongoose.model('doctorModel', doctorSchema);

export default doctorModel;


//   _id: 'doc1',
//     name: 'Dr. Aarav Jain',
//     image: doc1,
//     speciality: 'General physician',
//     degree: 'MBBS',
//     experience: '4 Years',
//     about: 'Dr. Aarav Jain is a trusted General Physician with 4 years of experience in managing routine illnesses and chronic health conditions with a focus on preventive care.',
//     fees: 400,
//     address: {
//       line1: '5, MG Road',
//       line2: 'Indiranagar, Bengaluru, Karnataka'
//     }