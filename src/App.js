import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth } from "./firebase";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
