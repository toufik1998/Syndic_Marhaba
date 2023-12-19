const express = require("express");
const { createPayment, getAllPayments, deletePaymentById } = require("../controllers/paymentController")

const router = express.Router();

router.post('/create_payment', createPayment)
router.get('/get_all_payments', getAllPayments)
router.delete('/delete_payment/:id', deletePaymentById)



module.exports = router;
