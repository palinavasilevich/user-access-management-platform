import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";

export function UnauthorizedPage() {
  return (
    <div className="p-8 text-center">
      <h1>403 - Access Denied</h1>
      <p>You do not have permission to view this page</p>
      <Link to={ROUTES.HOME}>Return to Home</Link>
    </div>
  );
}
