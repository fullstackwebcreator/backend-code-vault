import FilterDto from "dto/filter.dto"
import { NextFunction, Request, Response, Router } from "express"
import Controller from "interfaces/controller.interface"
import filterModel from "models/filter.model"

class FilterController implements Controller {
  public path = "/filter"
  public router = Router()
  public filter = filterModel

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
		this.router.get(`${this.path}`, this.getFilters)
		this.router.post(`${this.path}`, this.createFilters)
  }
  private getFilters = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const data = await this.filter.find()
    response.send(data)
  }
  private createFilters = async (
    request: Request,
    response: Response,
    next: NextFunction
	) => {
		const reqData : FilterDto = request.body
		const data = await this.filter.create({
			...reqData
		})
    response.send(data)
  }
}

export default FilterController
