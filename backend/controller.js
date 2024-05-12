const Flowers = require('./flower.model');

// Controller action to add new flower
exports.addFlower = async (req, res) => {
    const { flowerId, flowerName, pricePerStem, quantity } = req.body;

    try {
        // create a new flower
        const flower = new Flowers({
            flowerId,
            flowerName,
            pricePerStem,
            quantity,   
        });

        const newFlower = await flower.save();
        res.status(201).json({ message: 'Flower added successfully', flower: newFlower });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};