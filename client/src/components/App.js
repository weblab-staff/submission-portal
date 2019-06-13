import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Root from "./Root";
import Register from "./Register";

library.add(fas)

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    )
    ;
  }
}

export default App;