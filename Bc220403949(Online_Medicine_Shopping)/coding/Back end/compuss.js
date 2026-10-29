const mongoose = require("mongoose");
const MedicinesSchema = new mongoose.Schema({
  name: String,
  password: String,
  company: String,
  image: { type: String, default: null },
  number: {
    type: String,
    unique: true,
  },
  address: String,
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "customer", "manager", "supplier", "Nill"],
    default: "customer",
  },
  price: String,
  quantity: String,
  category: String,
suppliedMedicines: { type: String },
  expiryDate: {
    type: String,
  },
  supplier: {
    type: String,
  },
  id: String,
  product: String,
});

const credential = mongoose.model("credentials", MedicinesSchema);
const medicine = mongoose.model("medicines", MedicinesSchema);
const supplier = mongoose.model("suppliers", MedicinesSchema);
const order = mongoose.model("orders", MedicinesSchema);
const cart = mongoose.model("carts", MedicinesSchema);
module.exports = {
  credential,
  medicine,
  supplier,
  order,
  cart,
};
