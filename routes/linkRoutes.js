import express from 'express'
import linkController from '../controllers/linkController.js'

const LinksRouter = express.Router()

LinksRouter.get("/:id", linkController.getById)
LinksRouter.get("/", linkController.getList)
LinksRouter.post("/", linkController.add)
LinksRouter.put("/:id", linkController.update)
LinksRouter.delete("/:id", linkController.delete)

export default LinksRouter