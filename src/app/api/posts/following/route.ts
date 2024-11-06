import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    
    const PAGE_SIZE = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
        where : {
            user : {
                followers : {
                    some : {
                        followerId : user.id
                    }
                }
            }
        },
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: getPostDataInclude(user.id),
    })

    const nextCursor = posts.length > PAGE_SIZE ? posts[PAGE_SIZE].id : null;

    const data: PostPage = {
      posts: posts.slice(0, PAGE_SIZE),
      nextCursor,
    };

    return Response.json(data);
} catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
