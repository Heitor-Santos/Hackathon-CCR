import { Request, Response, Router } from "express"
import { Db } from 'mongodb';
import { getHome, postHome } from "../controllers/home";

export default function (db: Db) {
    const router: Router = Router();

    const routes = [
        {
            method: 'get',
            path: '/',
            controller: (req: Request, res: Response) => {
                getHome(req,res,db)
            }
        },
        {
            method: 'post',
            path: '/',
            controller: (req: Request, res: Response) => {
                postHome(req,res,db)
            }
        },
    ];

    for (const route of routes) {
        router[route.method](route.path, route.controller);
    }

    return router;
}