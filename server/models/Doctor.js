const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  "d-id": Number,
  image: String,
  name: String,
  age: Number,
  experience: Number,
  sex: String,
  specialization: String,
  city: String,
  "map location": String,
  "mode of appointment": String,
  "ph no": String,
  "email id": String,
  "days available": String,
  timing: String,
  fees: Number,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
