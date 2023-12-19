const mongoose = require('mongoose');
const { Schema } = mongoose;


const paymentSchema = new Schema({
    apartment: {
      type: Schema.Types.ObjectId,
      ref: 'apartment',
      required: true
    },
    status: {
      type: Boolean,
      required: true
    }, 
    date: {
      type: Date,
      required: false
    }
  }, {
    timestamps: true
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;