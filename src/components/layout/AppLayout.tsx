import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
