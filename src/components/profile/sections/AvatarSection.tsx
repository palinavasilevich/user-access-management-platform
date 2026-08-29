import { useEffect, useState } from "react";
import { useUpload } from "@/hooks/useUpload";

import type { User } from "@/types/user";

interface AvatarSectionProps {
  user: Pick<User, "profile" | "email">;
  isEdit: boolean;
  onSubmit: (avatar: string) => Promise<void>;
}

export function AvatarSection({ user, isEdit, onSubmit }: AvatarSectionProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { state, isUploading, isSuccess, upload, reset } = useUpload();

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Please select a JPG or PNG image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("The image must be smaller than 2 MB.");
      return;
    }

    reset();

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleUploadAvatar = async () => {
    if (!avatarPreview) return;

    const response = await upload(new File([], "avatar"), {
      url: "/api/avatar",
    });

    if (response?.url) {
      await onSubmit(response.url);
      setAvatarPreview(null);
    }
  };

  const currentAvatar = user.profile?.avatar;

  const initials =
    user.profile?.firstName?.[0]?.toUpperCase() ?? user.email[0]?.toUpperCase();

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-lg font-medium text-gray-500">
          {currentAvatar ? (
            <img
              src={currentAvatar}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900">Profile picture</p>

          <p className="mt-1 text-xs text-gray-500">
            JPG or PNG. Maximum file size 2 MB.
          </p>
        </div>
      </div>

      {isEdit && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Choose a new picture
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              disabled={isUploading}
              className="mt-2 block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>

          {avatarPreview && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-gray-700">Preview</p>

              <div className="flex items-center gap-4">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="h-20 w-20 rounded-full object-cover"
                />

                <button
                  type="button"
                  onClick={handleUploadAvatar}
                  disabled={isUploading}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Save"}
                </button>
              </div>
            </div>
          )}

          {isSuccess && (
            <p className="mt-3 text-sm text-green-600">
              Profile picture updated successfully.
            </p>
          )}

          {state.status === "error" && (
            <p className="mt-3 text-sm text-red-600">{state.error}</p>
          )}
        </div>
      )}
    </div>
  );
}
