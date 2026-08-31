import { useState } from "react";
import { PersonalInfo } from "@/components/profile/sections/PersonalInfo";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

import type { User } from "@/types/user";
import { ProfileSection } from "@/components/profile/ui/ProfileSection";
import { AvatarSection } from "@/components/profile/sections/AvatarSection";
import { ChangePassword } from "@/components/profile/sections/ChangePassword";

export type EditMode = {
  profile: boolean;
  password: boolean;
  avatar: boolean;
};

export type ProfileFormData = Pick<User, "profile" | "email">;

export function ProfilePage() {
  const { user: currentUser } = useAuth();

  const [editMode, setEditMode] = useState<EditMode>({
    profile: false,
    password: false,
    avatar: false,
  });

  const { user, loading, error, updateUser } = useUser(currentUser?.id);

  const toggleEditMode = (field: keyof EditMode) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSaveProfile = async (data: ProfileFormData) => {
    const updatedUser = await updateUser(data);

    if (updatedUser) {
      toggleEditMode("profile");
    }
  };

  const handleSaveAvatar = async (avatar: string): Promise<void> => {
    const updatedUser = await updateUser({
      profile: {
        ...user?.profile,
        avatar,
      },
    });

    if (updatedUser) {
      toggleEditMode("avatar");
    }
  };

  if (loading && !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="mx-auto max-w-3xl p-6 sm:p-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-semibold text-red-900">
            Unable to load profile
          </h1>

          <p className="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl p-6 sm:p-8">
        <p className="text-sm text-gray-500">User not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-8 sm:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          User Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="space-y-6">
        <ProfileSection
          title="Personal information"
          description="Update your name and email address."
          isEdit={editMode.profile}
          onEdit={() => toggleEditMode("profile")}
        >
          <PersonalInfo
            user={user}
            isEdit={editMode.profile}
            onSubmit={handleSaveProfile}
          />
        </ProfileSection>

        <ProfileSection
          title="Profile picture"
          description="Manage your profile picture."
          isEdit={editMode.avatar}
          onEdit={() => toggleEditMode("avatar")}
        >
          <AvatarSection
            user={user}
            isEdit={editMode.avatar}
            onSubmit={handleSaveAvatar}
          />
        </ProfileSection>

        <ProfileSection
          title="Change Password"
          description="Update your password to keep your account secure."
          isEdit={editMode.password}
          onEdit={() => toggleEditMode("password")}
        >
          {editMode.password && (
            <ChangePassword
              userId={user.id}
              onComplete={() => toggleEditMode("password")}
            />
          )}
        </ProfileSection>
      </div>
    </div>
  );
}
