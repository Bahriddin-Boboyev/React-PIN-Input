import { Suspense, Fragment, lazy } from "react";
import { Switch, Route } from "react-router-dom";

export const renderRoutes = (routes = []) => (
  <Suspense>
    <Switch>
      {routes?.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/",
    component: lazy(() => import("./App")),
  },
  {
    exact: true,
    path: "/home",
    component: lazy(() => import("./Home")),
  },
];

export default routes;
