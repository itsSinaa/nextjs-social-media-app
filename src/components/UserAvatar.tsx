import React from "react";
import avatarPlacehodler from "@/assets/avatar-placeholder.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, className, size }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || avatarPlacehodler}
      alt="User Avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        className,
      )}
    />
  );
};

export default UserAvatar;
