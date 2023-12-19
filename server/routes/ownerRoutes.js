const express = require("express");
const { createOwner, getOwners, updateOwner, deleteOwner } = require("../controllers/ownerController")

const router = express.Router();

router.post('/create_owner', createOwner)
router.get('/get_all_owners', getOwners)
router.put('/update_owner/:id', updateOwner)
router.delete('/delete_owner/:id', deleteOwner)


module.exports = router;
