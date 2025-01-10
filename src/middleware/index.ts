import { NextFunction, Request, Response } from "express";

class middleware {
    middlewareCenter(req: Request, res: Response, next: NextFunction) {
        console.log(req.protocol + "://" + req.get("host") + req.originalUrl + "/method: " + req.method);
        next();
    }
}

export default new middleware();