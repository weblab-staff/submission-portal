import React from "react";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Root from "./Root";
import Register from "./Register";
import TeamView from "./TeamView/TeamView.js";
import CreateTeam from "./TeamView/CreateTeam.js";
import JoinTeam from "./TeamView/JoinTeam.js";

import "../css/app.css";
import "../css/theme.css";
import "../css/skeleton.css";

library.add(fas);

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/team" component={TeamView} />
          <Route exact path="/create-team" component={CreateTeam} />
          <Route exact path="/join-team" component={JoinTeam} />
        </Switch>
      </div>
    );
  }
}

export default App;
