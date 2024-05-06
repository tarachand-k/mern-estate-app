import { create } from "zustand";
import apiRequest from "./api-requests";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async function () {
    const res = await apiRequest("/users/notification");
    set({ number: res.data.number });
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));
