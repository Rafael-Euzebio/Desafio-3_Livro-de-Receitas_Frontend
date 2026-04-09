import { Outlet } from "react-router";

import { Card } from "@/components/ui/card";

export const MainLayout = () => {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-360 overflow-hidden p-3 shadow-xl">
        <Outlet />
      </Card>
    </div>
  );
};
