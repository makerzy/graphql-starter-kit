import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";

interface ReqResNext {
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface Context extends ReqResNext {
  db: Db;
}
