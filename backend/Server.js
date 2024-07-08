const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/deliverySystem")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  orderName: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryFee: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
app.post("/createuser", async (req, res) => {
  const bodyData = req.body;
  const user = new User(bodyData);
  const userdata = await user.save();
  res.send(userdata);
});
app.get("/allusers", async (req, res) => {
  const user = await User.find({});
  res.send(user);
});

app.delete("/deleteuser/{id}", async (req, res) => {
  const user = await User.findOneAndDelete({ _id: id });
  res.send(user);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`); // Use backticks for template literals
});
