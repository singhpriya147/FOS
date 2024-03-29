const express = require('express');
const router = express.Router();
const {
  calculatePriceController,
  createItem,
  createOrganization,
  createPricing
} = require('../controllers/foodController');


// Route to calculate price



/**
 * @swagger
 * /api/food/calculate-price:
 *   post:
 *     summary: Calculate price
 *     description: Calculate the price based on item details and delivery parameters.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *               organization_id:
 *                 type: integer
 *               total_distance:
 *                 type: number
 *               item_type:
 *                 type: string
 *               item_id:
 *                type: number
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 */







router.post('/calculate-price', calculatePriceController);
router.post('/items', createItem);
router.post('/organizations', createOrganization);
router.post('/postpricing',createPricing)

module.exports = router;








//  *    description:The total price of deliverable item is calculated on the basis of it's base price from which organization is purchased and base distance . If the distance is greater then base distance then above it the organization will charge extra price per km and price will also increase if the item is come under the category of perishable item 