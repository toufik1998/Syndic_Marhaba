const Apartment = require('../models/Apartment');
const Owner = require('../models/Owner');
const Payment = require('../models/Payment');

// Create a new payment
exports.createPayment = async (req, res) => {
  const { apartment, date, status  } = req.body;

  try {
    // Check if the specified apartment and owner exist
    const apartmentExists = await Apartment.exists({ _id: apartment });

    if (!apartmentExists) {
      return res.status(404).json({ error: 'Apartment or owner not found' });
    }

    const payment = new Payment({
      apartment,
      date,
      status, 
    });

    const newPayment = await payment.save();
    res.status(200).json(newPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

// Get all payments
// exports.getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find().populate('apartment');
//     res.status(200).json(payments);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to retrieve payments' });
//   }
// };


exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate({
      path: 'apartment',
      populate: {
        path: 'owner',
        select: 'name',
      },
    }).lean();

    const formattedPayments = payments.map(payment => ({
      ...payment,
      apartment: {
        ...payment.apartment,
        owner: payment.apartment.owner.name,
      },
    }));

    res.status(200).json(formattedPayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve payments' });
  }
};



// Get a single payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id).populate('owner apartment');
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve payment' });
  }
};

// Update a payment by ID
exports.updatePaymentById = async (req, res) => {
  const { id } = req.params;
  const { owner, apartment, status } = req.body;

  try {
    // Check if the specified apartment and owner exist
    const apartmentExists = await Apartment.exists({ _id: apartment });
    const ownerExists = await Owner.exists({ _id: owner });

    if (!apartmentExists || !ownerExists) {
      return res.status(404).json({ error: 'Apartment or owner not found' });
    }

    const payment = await Payment.findByIdAndUpdate(
      id,
      { owner, apartment, status },
      { new: true }
    ).populate('owner apartment');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update payment' });
  }
};

// Delete a payment by ID
exports.deletePaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
};