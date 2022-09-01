import { Router } from 'express'
import { Request, Response } from "express";
import * as controller from '../controllers/playlist.controller'

const router = Router()

router.get('/', (req: Request, res: Response) => res.redirect('/playlist/all') )

router.get('/all', controller.getAll)

router.get('/:id', controller.get)

router.post('/', controller.create)

router.post('/add-track', controller.addTrack)

router.delete('/remove-track', controller.removeTrack)

router.put('/:id', controller.update)

router.delete('/:id', controller.remove)

export default router
