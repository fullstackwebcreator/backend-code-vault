import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as express from "express"
import * as mongoose from "mongoose"
import * as session from "express-session"
import Controller from "./interfaces/controller.interface"
import errorMiddleware from "./middleware/error.middleware"

class App {
  public app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express()
    this.connectToTheDatabase()
		this.initializeMiddlewares();
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`)
    })
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
    this.app.use(
      session({
				secret: process.env.SESSION_SECRET_KEY,
				saveUninitialized: false,
				resave: true,
        cookie: { maxAge: 2628000000 }
      })
		)
		this.app.use(express.static(__dirname))
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  private connectToTheDatabase() {
		const { MONGO_URI } = process.env
		mongoose.set("strictQuery", false);
    mongoose.connect(`${MONGO_URI}`)
  }
}

export default App
