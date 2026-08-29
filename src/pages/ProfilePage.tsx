import { useState } from "react";
import { PersonalInfo } from "@/components/profile/sections/PersonalInfo";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

import type { User } from "@/types/user";
import { ProfileSection } from "@/components/profile/ui/ProfileSection";
import { AvatarSection } from "@/components/profile/sections/AvatarSection";

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

        {/* Avatar section */}
        {/* <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Profile picture
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your profile picture is visible to other users.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Edit
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-lg font-medium text-gray-500">
              {user.profile?.avatar ? (
                <img
                  src={user.profile.avatar}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                (user.profile?.firstName?.[0] ?? user.email[0].toUpperCase())
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">
                Profile picture
              </p>

              <p className="mt-1 text-xs text-gray-500">
                JPG or PNG. Maximum file size 2 MB.
              </p>
            </div>
          </div>
        </section>

        {/* Password section */}
        {/* <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Password</h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your password to keep your account secure.
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Change
            </button>
          </div>
        </section> */}

        {/* Account information */}
        {/* <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Account information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Basic information about your account.
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="flex justify-between gap-4 py-3">
              <span className="text-sm text-gray-500">Role</span>

              <span className="text-sm font-medium capitalize text-gray-900">
                {user.role}
              </span>
            </div>

            <div className="flex justify-between gap-4 py-3">
              <span className="text-sm text-gray-500">Member since</span>

              <span className="text-sm font-medium text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between gap-4 py-3">
              <span className="text-sm text-gray-500">Last login</span>

              <span className="text-sm font-medium text-gray-900">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Not available"}
              </span>
            </div>
          </div>
        </section>  */}
      </div>
    </div>
  );
}
