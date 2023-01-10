const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  product: Object,
  quantity: Number,
});

module.exports = mongoose.model("cart", cartSchema);
