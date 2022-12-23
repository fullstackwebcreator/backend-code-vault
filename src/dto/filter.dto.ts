import { IsString } from "class-validator"

class FilterDto {
  @IsString()
  public fname: string
}

export default FilterDto
