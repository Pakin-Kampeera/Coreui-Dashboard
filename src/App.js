import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/Login"));
const Register = React.lazy(() => import("./views/pages/Register"));
const Page404 = React.lazy(() => import("./views/pages/Page404"));
const ForgotPassword = React.lazy(() => import("./views/pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./views/pages/ResetPassword"));
const VerifiedEmail = React.lazy(() => import("./views/pages/VerifiedEmail"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/forgotPassword"
              name="Forgot Password Page"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              exact
              path="/resetPassword/:token"
              name="Reset Password Page"
              render={(props) => <ResetPassword {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              name="Dashboard Page"
              render={(props) => <TheLayout {...props} />}
            />
            <Route
              exact
              path="/users"
              name="Users Page"
              render={(props) => <TheLayout {...props} />}
            />
            <Route
              exact
              path="/notification"
              name="Notification Page"
              render={(props) => <TheLayout {...props} />}
            />
            <Route
              exact
              path="/verifiedEmail/:token"
              name="Verified Email Page"
              render={(props) => <VerifiedEmail {...props} />}
            />
            <Route
              exact
              path="*"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
