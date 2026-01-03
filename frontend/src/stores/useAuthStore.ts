import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  signUp: async (userName, password, email, firstName, lastName) => {
    try {
      set({ loading: true });
      //api call
      await authService.signUp(userName, password, email, lastName, firstName);
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
}));
