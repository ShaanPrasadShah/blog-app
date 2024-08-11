import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

interface Env {
  JWT_SECRET:string;
  DATABASE_URL:string;
}


const app = new Hono<{Bindings : Env}>();
app.use('/*', cors())
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)





export default app
