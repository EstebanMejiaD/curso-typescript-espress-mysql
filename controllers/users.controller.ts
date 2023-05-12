import { Request, Response } from "express";
import User from "../models/usuario";


export const getUsers = async(req: Request, res: Response)=> {


    const users = await User.findAll()



    res.json({users})


}

export const getUser = async(req: Request, res: Response)=> {
    const { id } = req.params

    const user = await User.findByPk(id)
    
    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        })
    }

    res.json({
        user
        
    })


}

export const createUser = async (req: Request, res: Response)=> {
    const { is_active, email,...data} = req.body
 
   try {


    const isEmail = await User.findOne({where: {email}})
    const newUser =  User.build( data )


    if (isEmail) {
        return res.status(404).json({
            msg: 'Ya existe un email así en la base de datos'
        })
    }
    

        newUser.save()
    res.json({
        status: 201,
        newUser
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        msg: 'Hubo un error al crear el usuario revisa la consola'
    })
   }


}

export const updateUser = async(req: Request, res: Response)=> {
    const { id } = req.params
    const { is_active, createdAt, updatedAt,...data} = req.body

    const user = await User.findByPk(id)



    if (!User) {
        return res.status(404).json({
            msg: 'El usuario con esa id no existe'
        })
    }

   await user?.update(data)
    
 
    res.json({
        msg: 'updateUser',
        user
  
        
    })


}
export const deleteUser = async(req: Request, res: Response)=> {
    const { id } = req.params
    
    const user = await User.findByPk(id)
    
    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no encontrado'
        })
    }


    await user?.update({is_active: false})



    res.json({
        msg: 'Usuario '+id+' eliminado correctamente:',
    
        
    })


}




