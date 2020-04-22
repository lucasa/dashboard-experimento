import * as React from "react";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import GutembergEditor from "./GutemberdEditor";
import Grid from "./code/Grid";
import Experimento from "./Experimento";
import LocalStorageGridLayout from "./code/LocalStorageGridLayout";
import Chart from "./code/Chart";
import HorizontalFlow from "./instagram/HorizontalFlow";
import Dashboard from "./dashboard/Dashboard";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Experimento Interface Painéis</h1>
          <menu>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/experimento">Experimento</NavLink>
            <NavLink to="/editor">GutembergEditor</NavLink>
            <NavLink to="/code/grid">Chart Grid</NavLink>
            <NavLink to="/code/locallayout"> Local Storage</NavLink>
            <NavLink to="/instagram">Instagram</NavLink>
          </menu>
        </header>
        <section>
          <Switch>
            <Route path="/editor" component={GutembergEditor} />
            <Route path="/experimento" component={Experimento} />
            <Route path="/dashboard" component={Dashboard} />
            <Route
              path="/code/grid"
              component={() => {
                return (
                  <Grid
                    layouts={this.layouts}
                    items={this.items}
                    onItemClick={this.onItemClick}
                  />
                );
              }}
            />
            <Route
              path="/code/locallayout"
              component={LocalStorageGridLayout}
            />
            <Route path="/instagram" component={HorizontalFlow} />
            <Redirect to="/dashboard" />
          </Switch>
        </section>
      </div>
    );
  }

  layout = [
    { i: "headerimage", x: 0, y: 0, w: 6, h: 8, isResizable: false },
    { i: "votingmsg", x: 6, y: 0, w: 4, h: 3, isResizable: false },
    { i: "banner", x: 6, y: 12, w: 6, h: 3, isResizable: false },
    { i: "count", x: 6, y: 0, w: 3, h: 3, isResizable: false },
    { i: "facebook", x: 6, y: 6, w: 1, h: 2, static: true },
    { i: "github", x: 10, y: 10, w: 1, h: 2, static: true },
    { i: "vote", x: 6, y: 15, w: 1, h: 2, static: true },
    { i: "manifesto", x: 0, y: 8, w: 6, h: 13, isResizable: false },
    { i: "tech", x: 6, y: 8, w: 4, h: 4, isResizable: false }
  ];

  layout2 = [
    { i: "headerimage", x: 0, y: 0, w: 3, h: 5, static: true },
    { i: "votingmsg", x: 0, y: 6, w: 3, h: 3, static: true },
    { i: "banner", x: 0, y: 29, w: 3, h: 2, static: true },
    { i: "count", x: 0, y: 9, w: 3, h: 3, static: true },
    { i: "facebook", x: 0, y: 27, w: 1, h: 2, static: true },
    { i: "github", x: 1, y: 27, w: 1, h: 2, static: true },
    { i: "vote", x: 2, y: 27, w: 1, h: 2, static: true },
    { i: "manifesto", x: 0, y: 12, w: 3, h: 15, static: true },
    { i: "tech", x: 0, y: 31, w: 3, h: 4, static: true }
  ];

  items = [
    { i: "headerimage", className: "", el: <Chart /> },
    { i: "votingmsg", className: "voting text", el: <Chart /> },
    { i: "banner", className: "", el: <Chart /> },
    { i: "count", className: "voting text count", el: <Chart /> },
    { i: "facebook", className: "", el: <Chart /> },
    { i: "github", className: "", el: <Chart /> },
    { i: "vote", className: "", el: <Chart /> },
    { i: "manifesto", className: "", el: <Chart /> },
    { i: "tech", className: "", el: <Chart /> }
  ];

  onItemClick(e) {
    console.log("click");
  }
}

export default App;
