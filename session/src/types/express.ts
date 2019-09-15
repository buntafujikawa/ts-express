// Express.Request型は、Genericsを注入できる型定義になっていないため、継承した新たな型を用意する
import Express, { ExRequest, ExRequestHandler, ExResponse } from "express";
import { HttpError } from "http-errors";
import { GET } from "./get";
import { POST } from "./post";
import { PUT } from "./put";

declare module "express" {
  interface RequestParams {
    query?: any;
    params?: any;
    body?: any;
  }
  interface ExRequest<T extends RequestParams> extends Express.Request {
    params: T["params"];
    query: T["query"];
    body: T["body"];
  }
  // res.sendを拡張するための
  interface ExResponse<T> extends Express.Response {
    send: (body?: T) => ExResponse<T>;
  }
  interface ExNextFunction {
    (err?: HttpError): void;
  }
  interface ExRequestHandler<T extends { req?: any; res?: any }> {
    (
      req: ExRequest<T["req"]>,
      res: ExResponse<T["res"]>,
      next: ExNextFunction
    ): any;
  }
  interface Application {
    // getに定義されたパスのみ使用できるようにして、レスポンスもリクエストと同じパスになるように
    get: (<P extends keyof GET>(
      path: P,
      ...requestHandlers: ExRequestHandler<GET[P]>[]
    ) => any) &
      IRouterMatcher<this>;

    post: (<P extends keyof POST>(
      path: P,
      ...requestHandlers: ExRequestHandler<POST[P]>[]
    ) => any) &
      IRouterMatcher<this>;

    put: (<P extends keyof PUT>(
      path: P,
      ...requestHandlers: ExRequestHandler<PUT[P]>[]
    ) => any) &
      IRouterMatcher<this>;
  }
}
