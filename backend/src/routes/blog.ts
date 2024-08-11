import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";  
import { createPostInput, updatePostInput } from "@prasadshaan12/common";


interface Env {
	Bindings : {
		JWT_SECRET:string;
    	DATABASE_URL:string;
	},
	Variables : {
		userId : string;
	}
}

type jwtPayload = {
	id :string;
}



export const blogRouter = new Hono<Env>()

blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload:jwtPayload = await verify(token, c.env.JWT_SECRET) as jwtPayload;
    const userId = payload.id;
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    
	c.set('userId',userId);
	await next()
});

blogRouter.post('/',async (c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl:c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();

	const { success } = createPostInput.safeParse(body)

    if(!success){
      c.status(400);
      return c.json({
        message : 'invalid input'
      })
    }

	const post = await prisma.post.create({
		data:{
			title:body.title,
			content:body.content,
			authorID:userId
		}
	})
	return c.json({message:'post added',id:post.id})
})

blogRouter.put('/',async (c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl:c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();

	const { success } = updatePostInput.safeParse(body)

    if(!success){
      c.status(400);
      return c.json({
        message : 'invalid input'
      })
    }

	const post = await prisma.post.update({
		where : {
			id:body.id,
			authorID:userId
		},
		data:{
			title:body.title,
			content:body.content,
		}
	})
	return c.text("blog updated")
})
blogRouter.get('/:id',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl:c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const blog = await prisma.post.findUnique({
		where : {
			id:c.req.param('id'),
		}
	})
	return c.json({blog})
})
blogRouter.get('/',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl:c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const blog = await prisma.post.findMany({})
	if(!blog){
		return c.text("no posts");
	}
	return c.json({blogs:blog})
})

