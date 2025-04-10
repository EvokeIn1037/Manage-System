import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  apiurl: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, apiurl }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null); // null = loading
  const [loading, setLoading] = React.useState(true);

  const [userstr, setUserstr] = React.useState("");
  const [iconstr, setIconstr] = React.useState("");
  const [namestr, setNamestr] = React.useState("");
  const [isAdmin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(apiurl + "/me", {
          credentials: "include", // sends HttpOnly cookie
        });

        const data = await res.json();
        if (res.ok && data.authenticated) {
          setUserstr(data.user);
          setIconstr(data.icon);
          setNamestr(data.name);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    const checkAdmin = async () => {
      try {
        const res = await fetch(apiurl + "/admin", {
          credentials: "include", // sends HttpOnly cookie
        });

        const data = await res.json();
        if (res.ok && data.admin) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
        console.error("Admin check failed", error);
        setAdmin(false);
      }
    };

    checkAdmin();
    checkAuth();
  }, []);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return React.cloneElement(children, { user: userstr, icon: iconstr, name: namestr, admin: isAdmin });
};

export default PrivateRoute;
