import { Router } from 'express'
import { Request, Response } from "express";
import * as controller from '../controllers/track.controller'

const router = Router()

router.get('/', (req: Request, res: Response) => res.redirect('/track/all') )

router.get('/all', controller.getAll)

router.get('/:id', controller.get)

router.post('/', controller.create)

router.put('/:id', controller.update) 

router.delete('/:id', controller.remove)

export default router
