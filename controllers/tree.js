const Tree = require('../models/tree');
const logger = require('../utils/logger');

// Get all trees
exports.getAllTrees = async (req, res) => {
    try {
        const trees = await Tree.find();
        res.status(200).json(trees);
    } catch (err) {
        logger.error(`Error getting all trees: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get tree by ID
exports.getTreeById = async (req, res) => {
    const { id } = req.params;
    try {
        const tree = await Tree.findById(id);
        if (!tree) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        res.status(200).json(tree);
    } catch (err) {
        logger.error(`Error getting tree by ID: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create new tree
exports.insertTree = async (req, res) => {
    const { name, plantedDate, location, description, image, scientificName, family, plantedBy } = req.body;
    try {
        const newTree = new Tree({
            name,
            plantedDate,
            location,
            description,
            image,
            scientificName,
            family,
            plantedBy
        });
        const tree = await newTree.save();
        res.status(201).json(tree);
    } catch (err) {
        logger.error(`Error creating new tree: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update tree by ID
exports.updateTreeById = async (req, res) => {
    const { id } = req.params;
    const { name, plantedDate, location, description, image, scientificName, family, plantedBy } = req.body;
    try {
        const tree = await Tree.findById(id);
        if (!tree) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        tree.name = name || tree.name;
        tree.plantedDate = plantedDate || tree.plantedDate;
        tree.location = location || tree.location;
        tree.description = description || tree.description;
        tree.image = image || tree.image;
        tree.scientificName = scientificName || tree.scientificName;
        tree.family = family || tree.family;
        tree.plantedBy = plantedBy || tree.plantedBy;
        const updatedTree = await tree.save();
        res.status(200).json(updatedTree);
    } catch (err) {
        logger.error(`Error updating tree by ID: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete tree by ID
exports.deleteTreeById = async (req, res) => {
    const { id } = req.params;
    try {
        const tree = await Tree.findById(id);
        if (!tree) {
            return res.status(404).json({ error: 'Tree not found' });
        }
        await tree.remove();
        res.status(200).json({ message: 'Tree deleted successfully' });
    } catch (err) {
        logger.error(`Error deleting tree by ID: ${err.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

// Search trees by name or planted date
exports.searchTrees = async (req, res) => {
    const { query } = req.query;
    try {
        const trees = await Tree.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { plantedDate: { $regex: query, $options: 'i' } },
            ],
        }).populate('plantedBy', '_id name email');
        res.status(200).json(trees);
    } catch (err) {
        logger.error(`Error searching trees: ${err.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

