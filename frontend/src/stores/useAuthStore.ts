import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import axios from "axios";
import { persist } from "zustand/middleware";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,

      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        //Xóa dữ liệu đã lưu trong localStorage tránh việc dữ liệu bị dùng lại khi người khác đăng nhập
        localStorage.clear();
        useChatStore.getState().reset();
      },

      signUp: async (userName, password, email, firstName, lastName) => {
        try {
          set({ loading: true });
          //api call
          await authService.signUp(
            userName,
            password,
            email,
            firstName,
            lastName
          );
          toast.success(
            "Sign up success! You will be redirected to the login page."
          );
        } catch (error) {
          console.log(error);
          toast.error("Sign up failed!");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (userName, password) => {
        try {
          localStorage.clear();
          useChatStore.getState().reset();
          set({ loading: true });
          const { accessToken } = await authService.signIn(userName, password);
          get().setAccessToken(accessToken);
          toast.success("Welcome back to Moon");
          // fetch profile after sign in
          await get().fetchMe();
          useChatStore.getState().fetchConversations();
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? "Log in failed!";
            toast.error(message);
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Log in failed!");
          }
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          await authService.signOut();
          get().clearState();
          toast.success("Logout success!");
        } catch (error) {
          console.error(error);
          toast.error("An error occurred when logging out. please try again!");
        }
      },

      fetchMe: async () => {
        try {
          set({ loading: true });
          const res = await authService.fetchMe();
          // map backend userName -> frontend username
          const user = res.user
            ? {
                _id: res.user._id,
                username: res.user.userName ?? res.user.username,
                email: res.user.email,
                displayName: res.user.displayName,
                avatarUrl: res.user.avatarUrl,
                bio: res.user.bio,
                phone: res.user.phone,
                createdAt: res.user.createdAt,
                updatedAt: res.user.updatedAt,
              }
            : null;
          set({ user });
        } catch (error) {
          console.error(error);
          set({ user: null, accessToken: null });
          toast.error("An Error occurred when getting user data. Try again! ");
        } finally {
          set({ loading: false });
        }
      },

      refresh: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe, setAccessToken } = get();
          const accessToken = await authService.refresh();
          setAccessToken(accessToken);

          if (!user) {
            await fetchMe();
          }
        } catch (error) {
          console.error(error);
          toast.error("The login session has expired! Please Login again!");
          get().clearState();
        } finally {
          set({ loading: false });
        }
      },

      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
