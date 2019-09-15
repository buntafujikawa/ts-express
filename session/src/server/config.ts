import path from "path";
import Express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// index.tsで生成したexpressインスタンスが引数
export default (app: Express.Application) => {
  const publicDir = path.join(__dirname, "../public");
  const clientDir = path.join(__dirname, "../client");

  // 静的ファイルのホスティングディレクトリ
  app.use(Express.static(publicDir));
  // シンプルなview
  app.set("view engine", "ejs");
  // .ejsが置かれるディレクトリ
  app.set("views", clientDir);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
};
