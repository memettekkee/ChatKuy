import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { existingUser, registerUser, userById, updateUser } from '../model/userModel'

export const registerCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { name, email, password } = req.body
        let hashedPass = await bcrypt.hashSync(password, 10)
    
        const checkUser = await existingUser(email)
    
        if (checkUser) {
            res.status(403).json({
                error: true,
                message: "Email exist !"
            })
            return
        }

        const userData = {
            name: name,
            email: email,
            avatar: null,
            password: hashedPass
        }

        await registerUser(userData)

        res.status(201).json({
            error: false,
            message: "Account created !",
            user: userData
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e
        })
        return
    }
}

export const loginCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { email, password } = req.body

        const checkUser = await existingUser(email)

        if (!checkUser) {
            res.status(404).json({
                error: true,
                message: "Account didn't exist !"
            })
            return;
        }

        const validPassword = await bcrypt.compare(password, checkUser?.password)
        if (!validPassword) {
            res.status(403).json({
                error: true,
                message: "Wrong Email or Password !"
            })
            return
        }

        const token = jwt.sign(
            { 
                id: checkUser.id, 
                email: checkUser.email 
            },
            process.env.JWT_SECRET || 'default_jwt_secret',
            { expiresIn: '24h' } 
        );

        res.status(200).json({
            error: false,
            message: "Login success !",
            user: checkUser,
            token: token
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e
        })
        return
    }
}

export const getUserByIdCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = req.user?.id;

        const checkUser = await userById(userId as string)

        if (!checkUser) {
            res.status(404).json({
                error: true,
                message: "User didn't exist !"
            })
            return;
        }

        res.status(200).json({
            error: false,
            message: "User exist !",
            user: checkUser
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e.message
        })
        return
    }
}

export const updateUserCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { name, email } = req.body
        const userId = req.user?.id;
    
        const checkUser = await userById(userId as string)
    
        if (userId != checkUser?.id) {
            res.status(403).json({
                error: true,
                message: "Can't update, wrong ID !"
            })
            return;
        }

        const updatedData = await updateUser(userId as string, name, email)

        res.status(200).json({
            error: false,
            message: "User credential updated !",
            user: updatedData
        })
        return
    } catch (e: any) {
        res.status(500).json({
            error: true,
            message: e.message
        })
        return
    }
}