import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/team/*" element={<TeamView />} />
          <Route path="/create-team/*" element={<CreateTeam />} />
          <Route path="/join-team/*" element={<JoinTeam />} />
        </Routes>
      </>
    );
  }
}

export default App;
