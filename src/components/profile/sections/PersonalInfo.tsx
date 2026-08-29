import { z } from "zod";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";

import type { User } from "@/types/user";
import type { ProfileFormData } from "@/pages/ProfilePage";
import { InfoRow } from "../ui/InfoRow";

type UserInfo = Pick<
  User,
  "email" | "profile" | "role" | "createdAt" | "lastLogin"
>;

interface PersonalInfoProps {
  user: UserInfo;
  isEdit: boolean;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

const personalInfoSchema = z.object({
  email: z.email("Invalid email"),
  profile: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export function PersonalInfo({ user, isEdit, onSubmit }: PersonalInfoProps) {
  return (
    <div className="mt-6">
      {isEdit ? (
        <Form<PersonalInfoFormData>
          initialValues={{
            email: user.email,
            profile: {
              firstName: user.profile?.firstName ?? "",
              lastName: user.profile?.lastName ?? "",
            },
          }}
          onSubmit={onSubmit}
          validationSchema={personalInfoSchema}
          submitLabel="Save changes"
        >
          {({ values, errors, handleChange }) => (
            <div className="space-y-5">
              <Input
                label="Email"
                field="email"
                type="email"
                value={values.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <Input
                label="First name"
                field="profile.firstName"
                type="text"
                value={values.profile?.firstName ?? ""}
                // error={errors.profile?.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />

              <Input
                label="Last name"
                field="profile.lastName"
                type="text"
                value={values.profile?.lastName ?? ""}
                // error={errors.profile?.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
            </div>
          )}
        </Form>
      ) : (
        <div className="divide-y divide-gray-100">
          <InfoRow
            label="First name"
            value={user.profile?.firstName || "Not specified"}
          />

          <InfoRow
            label="Last name"
            value={user.profile?.lastName || "Not specified"}
          />

          <InfoRow label="Email" value={user.email} />

          <InfoRow label="Role" value={user.role} />

          <InfoRow
            label="Member since"
            value={new Date(user.createdAt).toLocaleDateString()}
          />

          <InfoRow
            label="Last login"
            value={
              user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "Not available"
            }
          />
        </div>
      )}
    </div>
  );
}
