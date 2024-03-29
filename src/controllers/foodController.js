const { Pricing, Organization, Item } = require('../models/schema');
const { calculatePrice } = require('../services/priceCalculator');

const calculatePriceController = async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_type,item_id } = req.body;
    console.log("req-body",req.body);
    if (!organization_id) {
      return res.status(400).json({ error: 'Organization ID is required' });
    }
    if (!zone) {
      return res.status(400).json({ error: 'zone is required' });
    }


      
    const pricing = await Pricing.findOne({
      
      where: {
        organization_id: organization_id,
        item_id: item_id,
        zone: zone,
        
      },
      schema: 'food_delivery',
    });

    
  
    if (!pricing) {
      return res
        .status(404)
        .json({ error: 'Pricing not found for the specified parameters' });
    }

   let totalPriceCents = calculatePrice(pricing, total_distance);

   if (item_type === 'perishable' && pricing.perishable_extra_price !== null) {
     totalPriceCents += pricing.perishable_extra_price * 100; // Convert euros to cents
   }
    const totalPrice = totalPriceCents / 100 ; // Convert cents to euros
    console.log(totalPrice);
    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error('Error calculating price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createItem = async (req, res) => {
  try {
   
    const { type, description } = req.body;

   
    const newItem = await Item.create({ type, description });

   
    res
      .status(201)
      .json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
   
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createOrganization = async (req, res) => {
  try {
    const { id, name } = req.body;

    const newOrganization = await Organization.create({ id, name });

    res
      .status(201)
      .json({ message: 'Item created successfully', organization: newOrganization });
  } catch (error) {
    console.error('Error creating organization:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createPricing = async (req, res) => {
  try {
    const {
      organization_id,
      item_id,
      zone,
      base_distance_in_km,
      km_price,
      base_price,
      perishable_extra_price,
    } = req.body;

    // Create a new pricing record in the Pricing table
    const newPricing = await Pricing.create({
      organization_id,
      item_id,
      zone,
      base_distance_in_km,
      km_price,
      base_price,
      perishable_extra_price,
    });

    res
      .status(201)
      .json({ message: 'Pricing added successfully', pricing: newPricing });
  } catch (error) {
    console.error('Error creating pricing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  calculatePriceController,
  createItem,
  createOrganization,
  createPricing,
};
