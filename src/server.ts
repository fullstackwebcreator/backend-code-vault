import "dotenv/config"
import "reflect-metadata"
import App from "./app"
;(async () => {
  try {
    const app = new App([])
    app.listen()
  } catch (error) {
    console.log("Error while connecting to the database", error)
    return error
  }
})()
