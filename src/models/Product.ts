import * as mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, unique: true },
  name: String,
  japanPrice: String,
  linkAmazon: String,
  vietnamPrice: String,
  dateBuy: Date,
  image: String,
  owner: String,
  productInfor: String,
  color: String,
  size: String,
  category: String,
  delFlag: {
      type: Boolean,
      default: false
  }
});

const Product = mongoose.model("Product", productSchema);
export default Product;