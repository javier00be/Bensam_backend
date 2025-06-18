const Talla = require('../models/tallaModel');

// Create a new Talla
async function createTalla (req, res) {
  try {
    console.log("Request body:", req.body);
    const newTalla = new Talla(req.body);
    try {
      const savedTalla = await newTalla.save();
      res.status(201).json(savedTalla);
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error
        res.status(409).json({ message: 'Talla already exists' });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Tallas
async function getAllTallas (req, res) {
  try {
    let tallas = await Talla.find();

    // Custom sort function
    tallas.sort((a, b) => {
      const tallaA = a.talla;
      const tallaB = b.talla;

      // Function to determine if a string is a number
      const isNumber = (str) => /^\d+$/.test(str);

      const isANumber = isNumber(tallaA);
      const isBNumber = isNumber(tallaB);

      if (isANumber && isBNumber) {
        // Both are numbers, sort in descending order
        return parseInt(tallaB) - parseInt(tallaA);
      } else if (isANumber && !isBNumber) {
        // A is a number, B is a string, number should come first
        return -1;
      } else if (!isANumber && isBNumber) {
        // B is a number, A is a string, number should come first
        return 1;
      } else {
        // Both are strings, sort alphabetically
        const order = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        const indexA = order.indexOf(tallaA);
        const indexB = order.indexOf(tallaB);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB; // Sort based on the order array
        } else if (indexA !== -1) {
          return -1; // A is in order array, B is not
        } else if (indexB !== -1) {
          return 1; // B is in order array, A is not
        } else {
          return tallaA.localeCompare(tallaB); // Fallback to alphabetical sort
        }
      }
    });

    res.status(200).json(tallas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Talla by ID
async function getTallaById (req, res) {
  try {
    const talla = await Talla.findById(req.params.id);
    if (!talla) {
      return res.status(404).json({ message: 'Talla not found' });
    }
    res.status(200).json(talla);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Talla by ID
async function updateTalla (req, res) {
  try {
    const updatedTalla = await Talla.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTalla) {
      return res.status(404).json({ message: 'Talla not found' });
    }
    res.status(200).json(updatedTalla);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Talla by ID
async function deleteTalla (req, res) {
  try {
    const deletedTalla = await Talla.findByIdAndDelete(req.params.id);
    if (!deletedTalla) {
      return res.status(404).json({ message: 'Talla not found' });
    }
    res.status(200).json({ message: 'Talla deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTalla,
  getAllTallas,
  getTallaById,
  updateTalla,
  deleteTalla
};
