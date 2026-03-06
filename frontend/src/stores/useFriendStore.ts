import { friendService } from "@/services/friendService";
import type { FriendState } from "@/types/store";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set, get) => ({
  friends: [],
  loading: false,
  receivedList: [],
  sentList: [],
  searchByUsername: async (username: string) => {
    try {
      set({ loading: true });
      const user = await friendService.searchByUsername(username);
      return user || null;
    } catch (error) {
      console.error("Search failed:", error);
      return null;
    } finally {
      set({ loading: false });
    }
  },

  addFriend: async (to: string, message?: string) => {
    try {
      set({ loading: true });
      const result = await friendService.sendFriendRequest(to, message);
      return result;
    } catch (error) {
      console.error("Add friend failed:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getAllFriendRequests: async () => {
    try {
      set({ loading: true });
      const result = await friendService.getAllFriendRequest();
      if (!result) return;
      const { sent, received } = result;
      set({ sentList: sent, receivedList: received });
    } catch (error) {
      console.error("Failed to get friend requests:", error);
    } finally {
      set({ loading: false });
    }
  },
  acceptRequest: async (requestId) => {
    try {
      set({ loading: true });
      await friendService.acceptRequest(requestId);
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (error) {
      console.error("Failed to accept friend request:", error);
    } finally {
      set({ loading: false });
    }
  },
  declineRequest: async (requestId: string) => {
    try {
      set({ loading: true });
      await friendService.declineRequest(requestId);
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (error) {
      console.error("Failed to decline friend request:", error);
    } finally {
      set({ loading: false });
    }
  },
  getFriends: async () => {
    try {
      set({ loading: true });
      const friends = await friendService.getFriendList();
      set({ friends: friends });
    } catch (error) {
      console.error("An error occurred while fetching friends:", error);
      set({ friends: [] });
    } finally {
      set({ loading: false });
    }
  },
}));
