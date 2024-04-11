import { Router } from 'express'
import { createUser, getUsers, updateUser } from '../controllers/user.controller'

const router =  Router()

router.post('/create', createUser )

router.get('/get', getUsers )

router.put('/update/:id', updateUser )

export { router }