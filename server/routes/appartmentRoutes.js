const express = require("express");
const { createApartment, getAllApartments, updateApartmentById, deleteApartmentById } = require("../controllers/apartmentController")

const router = express.Router();

router.post('/create_appartment', createApartment)
router.get('/get_all_appartment', getAllApartments)
router.put('/update_appartment/:id', updateApartmentById)
router.delete('/delete_appartment/:id', deleteApartmentById)


module.exports = router;
