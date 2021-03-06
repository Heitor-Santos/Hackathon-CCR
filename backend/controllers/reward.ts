import { Db } from "mongodb";
import { Request, Response } from 'express';
import { Reward, User } from "../interfaces";

export async function getAllRewards(req: Request, res: Response, db: Db) {

    const allRewards = <Reward[]> (await db.collection('rewards').find().limit(250).toArray())

    if (allRewards.length > 0) {
        res.send(allRewards)
    } else {
        res.status(404).send({msg: "no reward register"})
    }

}

export async function rescueReward(req: Request, res: Response, db: Db) {
    try {
        console.log(req.body)
        const reward : Reward = {
            tag: req.body.tag,
            xp_needed: req.body.xp_needed,
            data: {
                title: req.body.data.title,
                descrition: req.body.data.descrition,
                link: req.body.data.link ? req.body.data.link : null
            }
        }
    
        let user = <User> (await db.collection('users').findOne({email : req.body.email}))
        
        user.rewards.push(reward)
        user.ranking.xp = user.ranking.xp - reward.xp_needed
    
        await db.collection('users').replaceOne({email : req.body.email}, user)

        res.status(200).send({msg: "Reward rescue with success"})

    } catch (err) {
        console.log(err)
        res.status(500).send({msg: "Internal server error"})
    }
}