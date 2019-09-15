import Express from "express";

// @types/express-sessionのcount型をオーバーロードする
declare global {
  namespace Express {
    interface SessionData {
      count?: number;
    }
  }
}
