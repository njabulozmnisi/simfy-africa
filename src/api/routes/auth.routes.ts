import { Router } from 'express'
import * as controller from '../controllers/auth.controller'

const router = Router()

router.post('/login', controller.login);
router.post('/refreshToken', controller.refreshToken);

export default router
