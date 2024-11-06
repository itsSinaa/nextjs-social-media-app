"use client";

import { PostPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import Post from "./Post";
import kyInstance from "@/lib/ky";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";

const FollowingFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "following"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/posts/following",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No posts found.Start following people to see their posts.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      className="space-y-5"
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
};

export default FollowingFeed;
