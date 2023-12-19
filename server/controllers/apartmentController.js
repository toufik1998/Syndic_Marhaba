const Apartment = require("../models/Apartment")

// Create a new apartment
exports.createApartment = async (req, res) => {
  const { name, building, number, owner } = req.body;

  try {
    const apartment = new Apartment({
      name,
      building,
      number,
      owner
    });

    const newApartment = await apartment.save();
    res.status(200).json(newApartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create apartment' });
  }
};

// Get all apartments
exports.getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate('owner', 'name');
    res.status(200).json(apartments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve apartments' });
  }
};

// Get a single apartment by ID
exports.getApartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const apartment = await Apartment.findById(id);
    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.status(200).json(apartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve apartment' });
  }
};

// Update an apartment by ID
exports.updateApartmentById = async (req, res) => {
  const { id } = req.params;
  const { name, building, number, owner } = req.body;

  try {
    const apartment = await Apartment.findByIdAndUpdate(
      id,
      { name, building, number, owner },
      { new: true }
    ).populate('owner', 'name');
    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.status(200).json(apartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update apartment' });
  }
};

// Delete an apartment by ID
exports.deleteApartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const apartment = await Apartment.findByIdAndDelete(id);
    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete apartment' });
  }
};