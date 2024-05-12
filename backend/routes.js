const express = require("express");
const router = express.Router();

const controller = require('./controller');

/**
 * @swagger
 * tags:
 *   name: Flowers
 *   description: API endpoints for managing flower stock
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Flower:
 *       type: object
 *       required:
 *         - flowerId
 *         - flowerName
 *         - pricePerStem
 *         - quantity 
 *       properties:
 *         flowerId:
 *           type: number
 *           description: Flower's ID
 *         flowerName:
 *           type: string
 *           description: Flower's name
 *         pricePerStem:
 *           type: number
 *           description: Flower's price per stem
 *           default: 1 to 10000
 *         quantity:
 *           type: number
 *           description: Flower's available quantity
 *           default: 1 to 10000
 */

/**
 * @swagger
 * /api/staffs:
 *   post:
 *     summary: Add a new staff
 *     tags: [Staffs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddStaff'
 *     responses:
 *       '201':
 *         description: Staff added successfully
 *       '400':
 *         description: Bad request
 */
// POST route to add flower
router.post('/', controller.addFlower);

module.exports = router;