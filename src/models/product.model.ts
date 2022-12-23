import * as mongoose from "mongoose"
import Product from "../interfaces/product.interface"

const productSchema = new mongoose.Schema({
  pdname: String,
  pimg: String,
  images: String,
  cids: [],
  catname: String,
  brand: String,
  variantId: String,
  mrp: String,
  offerprice: String,
  totalQuantity: String,
  uomSingularPlural: {
    singular: String,
    plural: String,
    abbreviation: String,
  }
})

const productModel = mongoose.model<Product & mongoose.Document>(
  "Product",
  productSchema
)

export default productModel
