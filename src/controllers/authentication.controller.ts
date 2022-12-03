import { NextFunction, Request, Response, Router } from "express"
import Controller from "interfaces/controller.interface"
import validationMiddleware from "../middleware/validation.middleware"
import userModel from "models/user.model"
import LoginDto from "dto/login.dto"
import RegisterDto from "dto/register.dto"
import TokenData from "interfaces/tokenData.interface"
import UserWithThatEmailAlreadyExistsException from "exceptions/UserWithThatEmailAlreadyExistsException"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import DataStoredInToken from "interfaces/dataStoredInToken"
import WrongCredentialsException from "exceptions/WrongCredentialsException"
import User from "interfaces/user.interface"

class AuthenticationController implements Controller {
  public path = "/auth"
  public router = Router()
  private user = userModel

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegisterDto),
      this.registration
    )
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto),
      this.loggingIn
    )
  }

  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userData: RegisterDto = request.body
    if (await this.user.findOne({ email: userData.email })) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email))
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10)
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      })
      user.password = undefined
      const tokenData = this.createToken(user)
      response.setHeader("Set-Cookie", [this.createCookie(tokenData)])
      response.send(user)
    }
  }

  private loggingIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
		const logInData: LoginDto = request.body
		const user = await this.user.findOne({ username: logInData.username })
		if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      )
      if (isPasswordMatching) {
        user.password = undefined
        const tokenData = this.createToken(user)
        response.setHeader("Set-Cookie", [this.createCookie(tokenData)])
        response.send(user)
      } else {
        next(new WrongCredentialsException())
      }
    } else {
      next(new WrongCredentialsException())
    }
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60 // an hour
    const secret = process.env.JWT_SECRET
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    }
  }
}

export default AuthenticationController
