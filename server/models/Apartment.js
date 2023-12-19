const mongoose = require('mongoose');
const { Schema } = mongoose;

const apartmentSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  building: {
    type: String,
    required: true
  },
  number: {
    type: Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'owner'
  }
}, {
    timestamps: true

});



const Apartment = mongoose.model('apartment', apartmentSchema);
module.exports = Apartment;