import { type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isAdmin, isManager } from "@/utils/roleGuards";
import { getGreeting } from "@/utils/greeting";

export function DashboardPage() {
  const { user, hasPermission } = useAuth();

  return (
    <div className="min-h-full p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            {getGreeting()}, {user?.profile?.firstName || user?.email}!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Here’s an overview of what you can do.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Role
            </span>

            <span className="text-sm font-semibold capitalize text-gray-900">
              {user?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Section
            title="Viewing Data"
            description="Access information available to your account."
          >
            <p className="text-sm text-gray-600">
              You can view information across the application.
            </p>
          </Section>

          {hasPermission("write") && (
            <Section
              title="Editing"
              description="Create and update application content."
            >
              <p className="text-sm text-gray-600">
                You can edit content and create new posts.
              </p>

              <button
                type="button"
                className="
                  mt-4 rounded-lg bg-gray-900 px-4 py-2
                  text-sm font-medium text-white
                  transition-colors hover:bg-gray-800
                  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                "
              >
                Create a post
              </button>
            </Section>
          )}

          {isAdmin(user) && (
            <Section
              title="Managing Users"
              description="Manage users and access levels."
            >
              <p className="text-sm text-gray-600">
                You can manage users and edit their roles.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="
                    rounded-lg bg-gray-900 px-4 py-2
                    text-sm font-medium text-white
                    transition-colors hover:bg-gray-800
                  "
                >
                  Add user
                </button>

                <button
                  type="button"
                  className="
                    rounded-lg border border-gray-300 bg-white
                    px-4 py-2 text-sm font-medium text-gray-700
                    transition-colors hover:bg-gray-50
                  "
                >
                  Edit roles
                </button>
              </div>
            </Section>
          )}

          {isManager(user) && (
            <Section
              title="Moderation"
              description="Review and moderate user activity."
            >
              <p className="text-sm text-gray-600">
                You can review complaints and moderate content.
              </p>

              <button
                type="button"
                className="
                  mt-4 rounded-lg border border-gray-300 bg-white
                  px-4 py-2 text-sm font-medium text-gray-700
                  transition-colors hover:bg-gray-50
                "
              >
                Check complaints
              </button>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <p className="mt-1 text-sm text-gray-500">{description}</p>

      <div className="mt-5">{children}</div>
    </section>
  );
}
