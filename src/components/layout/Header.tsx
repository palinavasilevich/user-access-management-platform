import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-8">
          <Link
            to={ROUTES.HOME}
            className="text-lg font-semibold tracking-tight text-gray-900"
          >
            User Management
          </Link>

          <nav aria-label="Main navigation">
            <div className="flex items-center gap-6">
              <Link
                to={ROUTES.HOME}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Dashboard
              </Link>

              {user?.role === "admin" && (
                <Link
                  to={ROUTES.ADMIN}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  Admin panel
                </Link>
              )}

              {user && (
                <Link
                  to={`/profile/${user.id}`}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  Profile
                </Link>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden text-sm text-gray-600 sm:block">
                {user.profile?.firstName || user.email}
              </span>

              <button
                type="button"
                onClick={logout}
                className="
                  rounded-lg border border-gray-300 bg-white
                  px-3 py-1.5 text-sm font-medium text-gray-700
                  transition-colors
                  hover:bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
