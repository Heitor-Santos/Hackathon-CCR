import { Request, Response, Router } from "express"
import { Db } from 'mongodb';
import { createPublication, deletePublication, getAllPublication, updatePublication } from "../controllers/publication";
import { rescueReward, getAllRewards } from "../controllers/reward";
import { createUser, getUser, updateUser } from "../controllers/user";

export default function (db: Db) {
    const router: Router = Router();

    const routes = [
        {
            method: 'get',
            path: '/user',
            controller: (req: Request, res: Response) => {
                getUser(req,res,db)
            }
        },
        {
            method: 'post',
            path: '/user',
            controller: (req: Request, res: Response) => {
                createUser(req,res,db)
            }
        },
        {
            method: 'put',
            path: '/user',
            controller: (req: Request, res: Response) => {
                updateUser(req,res,db)
            }
        },
        {
            method: 'get',
            path: '/publication',
            controller: (req: Request, res: Response) => {
                getAllPublication(req,res,db)
            }
        },
        {
            method: 'get',
            path: '/publication/:id',
            controller: (req: Request, res: Response) => {
                getAllPublication(req,res,db)
            }
        },
        {
            method: 'post',
            path: '/publication',
            controller: (req: Request, res: Response) => {
                createPublication(req,res,db)
            }
        },
        {
            method: 'put',
            path: '/publication',
            controller: (req: Request, res: Response) => {
                updatePublication(req,res,db)
            }
        },
        {
            method: 'delete',
            path: '/publication',
            controller: (req: Request, res: Response) => {
                deletePublication(req,res,db)
            }
        },
        {
            method: 'get',
            path: '/rewards',
            controller: (req: Request, res: Response) => {
                getAllRewards(req,res,db)
            }
        },
        {
            method: 'put',
            path: '/rewards',
            controller: (req: Request, res: Response) => {
                rescueReward(req,res,db)
            }
        },
    ];

    for (const route of routes) {
        router[route.method](route.path, route.controller);
    }

    return router;
}