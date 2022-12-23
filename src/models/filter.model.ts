import Filter from "interfaces/filter.interface"
import * as mongoose from "mongoose"

const filterSchema = new mongoose.Schema({
  fname: String
})

const filterModel = mongoose.model<Filter & mongoose.Document>(
  "Filter",
  filterSchema
)

export default filterModel
