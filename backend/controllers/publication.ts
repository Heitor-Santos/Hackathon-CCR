import { Db } from "mongodb";
import { Request, Response } from 'express';
import { Publication } from "../interfaces";

export async function getAllPublication(req: Request, res: Response, db: Db) {

    const allPublication = <Publication[]> (await db.collection('publications').find().limit(250).toArray())

    if (allPublication.length > 0) {
        res.send(allPublication)
    } else {
        res.status(404).send({msg: "no reward register"})
    }

}

export async function getPublication(req: Request, res: Response, db: Db) {

    const allPublication = <Publication> (await db.collection('publications').findOne({id: req.params.id}))

    if (allPublication) {
        res.send(allPublication)
    } else {
        res.status(404).send({msg: "no reward register"})
    }

}

export async function createPublication(req: Request, res: Response, db: Db) {

    const publication: Publication = {
        id: req.body.id,
        subjects: req.body.subjects,
        media: req.body.media,
        rating: req.body.rating,
        author: {
            name: req.body.author.name,
            email: req.body.author.email
        },
        data: {
            title: req.body.data.title,
            descrition: req.body.data.descrition,
            date: req.body.data.date,
            image: req.body.data.image,
            link: req.body.data.link,
            geo_reference: req.body.data.geo_reference
        }
    }

    const publicationDb = await db.collection("publications").findOne({id: req.body.id})

    if (!publicationDb) {
        await db.collection("publications").insertOne(publication)
        res.status(200).send({msg: "Publication register with success"})
    } else {
        res.status(409).send({msg: "Publication already registered"})
    }

}

export async function updatePublication(req: Request, res: Response, db: Db) {

    const publication = <Publication> (await db.collection("publications").findOne({id: req.body.id}))

    for (var [key, value] of Object.entries(req.body)) {
        
        publication[key] = value
    }

    await db.collection('publications').replaceOne({id: req.body.id}, publication)

    res.status(200).send({msg: "Publication update with success"})
}

export async function deletePublication(req: Request, res: Response, db: Db) {

    await db.collection("publications").deleteOne({id: req.query.id})

    res.status(200).send({msg: "Delete update with success"})
}