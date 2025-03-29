import express from 'express'

import { userById } from '../model/userModel'

export const createPersonalConversationCtrl = async (
    req: express.Request,
    res: express.Response
) => {
    const { receiverId } = req.body

    if (!receiverId) {
        res.status(400).json({
            error: true,
            message: "Receiver didn't exist !"
        })
        return
    }
}