import type { User } from "@/types/user";
import { Card, CardContent } from "../ui/card";
import UserAvatar from "../chat/UserAvatar";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useSocketStore } from "@/stores/useSocketStore";
import AvatarUploader from "./AvatarUploader";

interface ProfileCardProps {
  user: User | null;
}
const ProfileCard = ({ user }: ProfileCardProps) => {
  const { onlineUsers } = useSocketStore();

  if (!user) return;
  const isOnline = onlineUsers.includes(user._id) ? true : false;

  const bio = user.bio ?? "No bio provided";
  return (
    <Card className="overflow-hidden p-0 h-52 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <CardContent className="mt-20 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-6">
        <div className="relative">
          <UserAvatar
            type="profile"
            name={user.displayName}
            avatarUrl={user.avatarUrl ?? undefined}
            className="ring-4 ring-white shadow-lg"
          />
          {/* avatar uploader */}
          <AvatarUploader />
        </div>

        {/* user info */}
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {user.displayName}
          </h1>

          {bio && (
            <p className="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">
              {bio}
            </p>
          )}
        </div>

        {/* status */}

        <Badge
          className={cn(
            "flex items-center gap-1 capitalize",
            isOnline
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700",
          )}
        >
          <div
            className={cn(
              "size-2 rounded-full animate-pulse",
              isOnline ? "bg-green-500" : "bg-gray-500",
            )}
          />
          online
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
