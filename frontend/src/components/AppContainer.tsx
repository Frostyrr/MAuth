import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AppContainer = () => {
  const { user, isPending, isLoading } = useAuth();
  const loading = isPending || isLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-black text-white font-sans">
        <Outlet />
      </div>
    );
  }

  return (
    <Navigate
      to="/login"
      replace
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
};

export default AppContainer;