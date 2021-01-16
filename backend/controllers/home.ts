import { Db } from "mongodb";
import { Request, Response } from 'express';

export async function getHome(req: Request, res: Response, db: Db) {
    /*
    -------------------------EXEMPLO:---------------------------

   const msg = await db.collection('users').findOne({teste: 123})

   if (msg) res.send(msg)
   else res.send("coisa boa coisa boa")
   --------------------------------------------------------------
   */

}

export async function postHome(req: Request, res: Response, db: Db) {
    
}