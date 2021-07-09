import React, { Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import AuthPage from "./pages/AuthPage";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatPage = React.lazy(() => import("./pages/ChatPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/auth">
            {!user && <AuthPage />}
            {user && <Redirect to="/profile" />}
          </Route>

          {user && (
            <Route path="/chat">
              <ChatPage />
            </Route>
          )}

          {user && (
            <Route path="/profile">
              <ProfilePage />
            </Route>
          )}

          <Route path="*">
            <Redirect to="/auth" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
