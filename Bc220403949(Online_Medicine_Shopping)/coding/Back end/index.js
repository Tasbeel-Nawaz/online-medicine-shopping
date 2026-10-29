const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { credential, medicine, supplier, order, cart } = require("./compuss");
const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/OMS")
  .then(async () => {
    console.log("MongoDB Connected");

    const collections = ["medicines", "credential", "supplier", "order", "cart"];

    for (const name of collections) {
      try {
        await mongoose.connection.db.collection(name).dropIndexes();
        console.log(`Old indexes cleared from ${name}!`);
      } catch (e) {
        console.log(`No indexes to clear in ${name}.`);
      }
    }
  })
  .catch((err) => console.error("Connection error:", err));

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/signup", async (req, res) => {
  try {
    const { name, email, number, password, address, role } = req.body;

    const existingUser = await credential.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });
    const user = await credential.create({
      name,
      email,
      number,
      password,
      role,
      address,
    });

    res.json({ success: true, message: "User Created Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await credential.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.role !== role) {
      return res.json({
        success: false,
        message: "You are not authorized as " + role,
      });
    }

    const match = password === user.password;
    if (!match) {
      return res.json({ success: false, message: "Wrong password" });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/verify-user", async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const user = await credential.findOne({ name, email, number });
    if (!user) return res.json({ success: false });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/change-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await credential.findOneAndUpdate(
      { email },
      { password: newPassword }
    );
    if (!user) {
      return res.status(404).json({ success: false });
    }
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.put("/update-profile", async (req, res) => {
  const { currentEmail, name, email, password, newPassword, image } = req.body;
  const user = await credential.findOne({ email: currentEmail });

  if (user && password === user.password) {
    user.name = name;
    user.email = email;
    if (image) user.image = image;
    if (newPassword) user.password = newPassword;
    await user.save();
    res.json({ success: true, user });
  } else {
    res.json({ success: false, message: "Invalid data" });
  }
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await credential.find({ role: "customer" });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/manager", async (req, res) => {
  try {
    const customers = await credential.find({ role: "manager" });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/customers/:id", async (req, res) => {
  try {
    const updated = await credential.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/manager/:id", async (req, res) => {
  try {
    const updated = await credential.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/customers/:id", async (req, res) => {
  try {
    const deleted = await credential.findOneAndDelete({
      _id: req.params.id,
      role: "customer",
    });

    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/manager/:id", async (req, res) => {
  try {
    const deleted = await credential.findOneAndDelete({
      _id: req.params.id,
      role: "manager",
    });

    if (!deleted) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/medicine_add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity, category, supplier, expiryDate, role} = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const newMedicine = await medicine.create({
      name,
      price,
      quantity,
      category,
      supplier,
      expiryDate,
      role,
      image: imagePath,
    });

    res.json({ success: true, message: "Medicine added with image!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/medicines", async (req, res) => {
  try {
    const data = await medicine.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/medicine_update/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) updateData.image = req.file.filename;

  await medicine.findByIdAndUpdate(req.params.id, updateData);
  res.json({ success: true });
});

app.delete("/medicine_delete/:id", async (req, res) => {
  try {
    await medicine.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/supplier_add", async (req, res) => {
  try {
    const newSupplier = await supplier.create(req.body);
    res.json({ success: true, message: "Supplier Added!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/suppliers", async (req, res) => {
  try {
    const data = await supplier.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
app.put("/supplier_update/:id", async (req, res) => {
  try {
    await supplier.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/supplier_delete/:id", async (req, res) => {
  try {
    await supplier.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Supplier Deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.put("/medicines/buy/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const foundMed = await medicine.findById(req.params.id);
    if (!foundMed) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    let currentQty = foundMed.quantity;
    if (currentQty <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }
    foundMed.quantity = currentQty - 1;
    await foundMed.save();
    const newOrder = new order({
      name: name, 
      email: email,
      product: foundMed.name,
      price: foundMed.price,
      image: foundMed.image
    });
    await newOrder.save();
    res.json({ message: "Order successful" , name: foundMed.name, id: foundMed._id, });

  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});






app.get("/my-orders/:email", async (req, res) => {
  try {
    const orders = await order.find({ email: req.params.email });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/order", async (req, res) => {
  try {
    const orders = await order.find(req.body );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


app.get('/api/medicines', async (req, res) => {
  try {
      const { search } = req.query; 
      let query = {};

      if (search) {
          query = {
              $or: [
                  { name: { $regex: search, $options: "i" } },
                  { category: { $regex: search, $options: "i" } }
              ]
          };
      }

      const medicines = await medicine.find(query);
      res.status(200).json(medicines);

  } catch (error) {
      console.error("Backend Error:", error);
      res.status(500).json({ message: "Server error occurred" });
  }
});


app.post("/cart", async (req, res) => {
  try {
    const { name, email, id, product, image, price, quantity } = req.body;

    let existing = await cart.findOne({ product, id, email });
    if (existing) {
      return res.json({ message: "Already Add To Cart", cart: existing });
    }

    const cartItem = new cart({
      name,
      email,
      id,
      product,
      image,
      price,
      quantity,
    });

    await cartItem.save();
    res.json({ message: "Added to cart", cart: cartItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Add to cart failed" });
  }
});


app.get("/get_cart/:email", async (req, res) => {
  try {
    const carts = await cart.find({ email: req.params.email });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


app.delete("/cart/:id", async (req, res) => {
  try {
    await cart.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(7000, () => {
  console.log("Server running on port 7000");
});
