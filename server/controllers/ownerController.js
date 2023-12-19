const Owner = require('../models/Owner');

// Create a new owner
exports.createOwner = async (req, res) => {
  const { name, cin } = req.body;

  try {
    const owner = new Owner({
      name,
      cin
    });

    const newOwner = await owner.save();
    res.status(200).json(newOwner);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create owner' });
  }
};

// Get all owners
exports.getOwners = async (req, res) => {
  try {
    const owners = await Owner.find({});
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch owners' });
  }
};

// Get a single owner by ID
exports.getOwnerById = async (req, res) => {
  const ownerId = req.params.id;

  try {
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      res.status(404).json({ error: 'Owner not found' });
    } else {
      res.status(200).json(owner);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch owner' });
  }
};

// Update an owner by ID
exports.updateOwner = async (req, res) => {
  const ownerId = req.params.id;
  const { name, cin } = req.body;

  try {
    const updatedOwner = await Owner.findByIdAndUpdate(ownerId, { name, cin }, { new: true });
    if (!updatedOwner) {
      res.status(404).json({ error: 'Owner not found' });
    } else {
      res.status(200).json(updatedOwner);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update owner' });
  }
};

// Delete an owner by ID
exports.deleteOwner = async (req, res) => {
  const ownerId = req.params.id;

  try {
    const deletedOwner = await Owner.findByIdAndRemove(ownerId);
    if (!deletedOwner) {
      res.status(404).json({ error: 'Owner not found' });
    } else {
      res.status(200).json(deletedOwner);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete owner' });
  }
};