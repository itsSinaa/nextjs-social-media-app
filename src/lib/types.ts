import { Prisma } from "@prisma/client";

export const userDataSelect = {
  username: true,
  displayName: true,
  avatarUrl: true,
  id: true,
} satisfies Prisma.UserSelect;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export interface PostPage {
  posts: PostData[];
  nextCursor: string | null;
}
