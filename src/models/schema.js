const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config();
const sequelize = new Sequelize('FOS', 'postgres', process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432, 
  logging: false, 
});


const Organization = sequelize.define(
  'Organization',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'Organization', schema: 'food_delivery' }
);


const Item = sequelize.define(
  'Item',
  {
    type: {
      type: DataTypes.ENUM('perishable', 'non-perishable'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { tableName: 'Item', schema: 'food_delivery' }
);

// Define Pricing model
const Pricing = sequelize.define(
  'Pricing',
  {
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    zone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_distance_in_km: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    km_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    base_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    perishable_extra_price: {
      type: DataTypes.DECIMAL(10, 2), // Additional price for perishable items
      allowNull: true, // Set to true if the extra price can be null
    },
  },
  { tableName: 'Pricing', schema: 'food_delivery' }
);

// Set up associations
// Pricing.belongsTo(Organization);
// Pricing.belongsTo(Item);
// Organization.hasMany(Pricing);
// Item.hasMany(Pricing);
// Set up associations with schema specified
// Pricing.belongsTo(Organization, { foreignKey: 'OrganizationId', targetKey: 'id', schema: 'food_delivery' });
// Pricing.belongsTo(Item, { foreignKey: 'ItemId', targetKey: 'id', schema: 'food_delivery' });
Organization.hasMany(Pricing, { foreignKey: 'organization_id', sourceKey: 'id', schema: 'food_delivery' });
Item.hasMany(Pricing, {
  foreignKey: 'item_id',
  sourceKey: 'id',
  schema: 'food_delivery',
});



// Pricing.belongsTo(Organization, {
//   foreignKey: 'organization_id',
//   targetKey: 'id',
//   schema: 'food_delivery',
// });
Pricing.belongsTo(Item, {
  foreignKey: 'item_id',
  targetKey: 'id',
  schema: 'food_delivery',
});
Pricing.belongsTo(Organization, { foreignKey: 'organization_id' });




module.exports = { Organization, Item, Pricing };
