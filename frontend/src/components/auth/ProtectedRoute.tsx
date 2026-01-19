import { useAuthStore } from "@/stores/useAuthStore";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (!accessToken) {
          await refresh();
        }
        if (!user) {
          await fetchMe();
        }
      } finally {
        setStarting(false);
      }
    };

    init();
  }, []);

  if (starting || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Page loading...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      {/* Outlet dùng để hiển thị route con trong các route cha */}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
