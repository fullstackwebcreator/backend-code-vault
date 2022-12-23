interface Product {
  _id?: string
  pdname: string
  pimg: string
  images: string
  cids: string[]
  catname: string
  brand: string
  variantId: string
  mrp: string
  offerprice: string
  totalQuantity: string
  uomSingularPlural: {
    singular: string
    plural: string
    abbreviation: string
  }
}

export default Product
