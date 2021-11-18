import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Plans from "./pages/Plans";
import Details from "./pages/Details";
import Subscription from "./pages/Subscription";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/plans" component={Plans} />
        <Route exact path="/details" component={Details} />
        <Route exact path="/subscription" component={Subscription} />
      </Switch>
    </Router>
  );
}

export default App;
