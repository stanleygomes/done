"use client";

import { useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { User } from "@paul/entities";
import { useAuth } from "../auth/use-auth";
import { authService } from "../auth/auth-api.service";

export function useUser() {
  const [user, setUser] = useLocalStorage<User | null>("app-user", null);
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const profile = await authService.getMe();
      setUser(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [setUser]);

  const updateProfile = async (data: { name: string }) => {
    try {
      const profile = await authService.updateMe(data);
      setUser(profile);
      return profile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (isAuthenticated && mounted && !user) {
      fetchProfile();
    }
  }, [isAuthenticated, mounted, user, fetchProfile]);

  return {
    user: mounted ? user : null,
    updateProfile,
    refreshProfile: fetchProfile,
  };
}
