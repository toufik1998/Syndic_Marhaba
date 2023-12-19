const { createApartment } = require('../controllers/apartmentController.js');
const { Apartment } = require('../models/Apartment.js');

// Mock the Apartment class
jest.mock('../models/Apartment.js', () => {
  return {
    Apartment: jest.fn().mockImplementation(() => ({
      save: jest.fn(),
    })),
  };
});

// Mock the request and response objects
const req = {
  body: {
    name: 'Sample Apartment',
    building: 'Sample Building',
    number: 123,
    owner: 'Sample Owner',
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('createApartment', () => {
  beforeEach(() => {
    // Clear mock function calls and instances before each test
    Apartment.mockClear();
    Apartment().save.mockClear();
  });

  it('should create a new apartment and return it', async () => {
    Apartment().save.mockResolvedValue({
      _id: 'abc123',
      name: 'Sample Apartment',
      building: 'Sample Building',
      number: 123,
      owner: 'Sample Owner',
    });

    await createApartment(req, res);

    expect(Apartment).toHaveBeenCalledTimes(1);
    expect(Apartment).toHaveBeenCalledWith({
      name: 'Sample Apartment',
      building: 'Sample Building',
      number: 123,
      owner: 'Sample Owner',
    });

    expect(Apartment().save).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      _id: 'abc123',
      name: 'Sample Apartment',
      building: 'Sample Building',
      number: 123,
      owner: 'Sample Owner',
    });
  });

  it('should handle errors when creating an apartment', async () => {
    const error = new Error('Failed to save apartment');
    Apartment().save.mockRejectedValue(error);

    await createApartment(req, res);

    expect(Apartment).toHaveBeenCalledTimes(1);
    expect(Apartment).toHaveBeenCalledWith({
      name: 'Sample Apartment',
      building: 'Sample Building',
      number: 123,
      owner: 'Sample Owner',
    });

    expect(Apartment().save).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create apartment' });
  });
});