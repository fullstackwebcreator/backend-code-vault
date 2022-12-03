import { IsString } from "class-validator"

class RegisterDto {
  @IsString()
  public username: string

  @IsString()
  public email: string

  @IsString()
  public password: string

  @IsString()
  public confirm_password: string
}

export default RegisterDto
