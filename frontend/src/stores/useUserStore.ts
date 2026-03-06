import { userService } from "@/services/userService";
import type { UserState } from "@/types/store";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useChatStore } from "./useChatStore";
export const useUserStore = create<UserState>((set, get) => ({
  updateAvatarUrl: async (formdata) => {
    try {
      const { user, setUser } = useAuthStore.getState();
      const data = await userService.uploadAvatar(formdata);

      if (user) {
        setUser({
          ...user,
          avatarUrl: data.avatarUrl,
        });

        useChatStore.getState().fetchConversations();
        toast.success("Avatar updated successfully!");
      }
    } catch (error) {
      console.error("Failed to upload avatar", error);
      toast.error("Failed to upload avatar. Please try again.");
    }
  },
}));
