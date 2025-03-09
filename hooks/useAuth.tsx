import { create } from "zustand";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  practicum: string;
  isGraduate: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: {
    studentId: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  signIn: async (credentials) => {
    set({ isLoading: false });

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, you would validate credentials against an API
    const dummyUser = {
      id: credentials.studentId || "P12345678",
      firstName: "Sam",
      lastName: "Smith",
      email: "Sam.Smith@saintmartins.edu",
      practicum: "Practicum 1",
      isGraduate: false,
    };

    await SecureStore.setItemAsync("user", JSON.stringify(dummyUser));
    set({ user: dummyUser, isLoading: false });
    router.replace("/(tabs)");
  },
  signOut: async () => {
    set({ isLoading: true });
    await SecureStore.deleteItemAsync("user");
    set({ user: null, isLoading: false });
    router.replace("/(auth)");
  },
  updateUser: async (data) => {
    set({ isLoading: true });

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    set((state) => {
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...data };
      SecureStore.setItemAsync("user", JSON.stringify(updatedUser));

      return { user: updatedUser, isLoading: false };
    });
  },
}));

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const authStore = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    async function loadUserFromStorage() {
      try {
        const storedUser = await SecureStore.getItemAsync("user");

        if (storedUser) {
          const user = JSON.parse(storedUser);
          authStore.updateUser(user);
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)");
        }
      } catch (error) {
        console.log("Failed to load user", error);
      } finally {
        authStore.isLoading = false;
        setIsReady(true);
      }
    }

    loadUserFromStorage();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
