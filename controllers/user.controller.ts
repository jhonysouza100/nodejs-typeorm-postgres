import { Request, Response } from "express";
import { User } from "../entities/User";

const createUser = async (req: Request, res: Response) => {

  try {

    const { firstname, lastname } = req.body

    const user = new User()
    user.firstname = firstname
    user.lastname = lastname
    await user.save()

    return res.json(user)
    
  } catch (error) {
    if(error instanceof Error) return res.status(400).json({
      error: error.message
    })
  }
}

const getUsers = async (req: Request, res: Response) => {
  
  try {

    const users = await User.find()

    return res.json(users)
    
  } catch (error) {
    if(error instanceof Error) return res.status(400).json({
      error: error.message
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  
  try {

    const {firstname, lastname} = req.body

    const user = await User.findOneBy({id: parseInt(req.params.id )})

    if(!user) throw new Error('USER_NOT_FOUND');

    user.firstname = firstname
    user.lastname = lastname
    user.save()

    // await User.update( 
    //   {id: parseInt(req.params.id)},
    //   {firstname: req.body.firstname, lastname: req.body.lastname}
    // )

    return res.status(204).json({"success": true})
    
  } catch (error) {
    if(error instanceof Error) return res.status(400).json({
      error: error.message
    })
  }
}

export { createUser, getUsers, updateUser }