import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { useAuth } from "../contexts/auth/AuthContext";
interface LayoutProps extends RouteProps {
  component: any;
  isPrivate?: any;
}

const LayoutRoute: React.FC<LayoutProps> = ({ isPrivate, component: Component, ...rest }) => {

  const { isAuth } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => isPrivate && !isAuth
        ?
        <Redirect to="/login" />
        :
        <Layout>
          <Component {...props} />
        </Layout>

      }
    />
  );
};

export default LayoutRoute;
