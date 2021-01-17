import { Db } from "mongodb";
import { Request, Response } from 'express';
import { User } from "../interfaces";

export async function createUser(req: Request, res: Response, db: Db) {

    const user = <User> {
        name: req.body.name,
        email: req.body.email,
        school: req.body.school,
        ranking: {
            level: 1,
            xp: 0
        },
        publications: [],
        rewards: [],
        favorites: []
    }

    const userDb = await db.collection("users").findOne({email: user.email})

    if (!userDb) {
        await db.collection("users").insertOne(user)
        res.status(200).send({msg: "User register with success"})
    } else {
        res.status(409).send({msg: "User already registered"})
    }
}

export async function getUser(req: Request, res: Response, db: Db) {

    const user = <User> (await db.collection("users").findOne({email: req.query.email}))
    
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(404).send({msg: "User not found"})
    }
}