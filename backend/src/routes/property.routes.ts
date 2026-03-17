import { Router } from 'express'
import {
  createProperty,
  deleteProperty,
  getProperty,
  listProperties,
  patchProperty,
} from '../controllers/property.controller.js'

export const propertyRouter = Router()

propertyRouter.get('/', listProperties)

propertyRouter.get('/:id', getProperty)

propertyRouter.post('/', createProperty)

propertyRouter.patch('/:id', patchProperty)

propertyRouter.delete('/:id', deleteProperty)

