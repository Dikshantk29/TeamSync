import { devtools, persist } from "zustand/middleware";
import { create, StateCreator } from "zustand";
import createSelectors from "./selectors";
import { immer } from "zustand/middleware/immer";

type AuthState = {
  accessToken: string | null;
  user: null;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
};

const createAuthSlice: StateCreator<AuthState> = (set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (token) => set({ accessToken: token }),
    clearAccessToken: () => set({ accessToken: null }),
//   clearAccessToken: () => {
//     sessionStorage.removeItem("session-storage"); // ✅ important for clearing persisted state
//     set({ accessToken: null, user: null });
//   },
});

type StoreType = AuthState;

export const useStoreBase = create<StoreType>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAuthSlice(...a),
      })),
      {
        name: "session-storage",
        getStorage: () => sessionStorage, // (optional) by default it's localStorage
      }
    )
  )
);
export const useStore = createSelectors(useStoreBase);
