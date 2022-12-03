import AuthenticationController from "./controllers/authentication.controller";
import "dotenv/config"
import "reflect-metadata"
import App from "./app"
;(async () => {
  try {
		const app = new App([
			new AuthenticationController()
		])
    app.listen()
  } catch (error) {
    console.log("Error while setting up the server", error)
    return error
  }
})()
