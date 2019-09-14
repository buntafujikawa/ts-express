import Express from 'express'
import cors from 'cors'
import { Health } from "../types/api";

// @types/expressにより、appインスタンスには適切な型が付与される
const app = Express()

// cors対応
app.use(cors())

app.get('/api/health', (req, res) => {
  const data: Health = { message: 'pong' }
  res.send(data)
})

// routeに一致しないrequest
app.use((req, res, next) => {
  res.sendStatus(404)
  next({ statusCode: 404 })
})

// エラーハンドリング
app.use(
  (
    err: { statusCode: number },
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    console.log(err.statusCode)
  }
)

const port = '8888'
const host = 'localhost'

// @ts-ignore
app.listen(port, host, () => {
  console.log(`Running on http://${host}:${port}`)
})
