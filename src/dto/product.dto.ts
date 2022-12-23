import { IsString } from "class-validator"

class ProductDto {
  @IsString()
  public pdname: string

  @IsString()
  public pimg: string

  @IsString()
  public images: string

  public cids: string[]

  @IsString()
  public catname: string

  @IsString()
  public brand: string

  @IsString()
  public variantId: string

  @IsString()
  public mrp: string

  @IsString()
  public offerprice: string

  @IsString()
  public totalQuantity: string

  public uomSingularPlural: {
    singular: string
    plural: string
    abbreviation: string
  }
}

export default ProductDto
