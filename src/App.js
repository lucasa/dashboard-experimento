import * as React from "react";
import PropTypes from "prop-types";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";

import GutembergEditor from "./GutemberdEditor";
import Grid from "./code/Grid";
import Experimento from "./Experimento";
import LocalStorageGridLayout from "./code/LocalStorageGridLayout";
import Chart from "./code/Chart";
import HorizontalFlow from "./instagram/HorizontalFlow";
import Dashboard from "./dashboard/Dashboard";
import InfiniteDashboard from "./dashboard/InfiniteDashboard";
import GridDashboard from "./dashboard/GridDashboard";
import StyledCards from "./StyledCards";
import Litegraph from "./pipeline/Litegraph";

import {
  Root,
  Header,
  Sidebar,
  CollapseBtn,
  CollapseIcon,
  SidebarTrigger,
  SidebarTriggerIcon,
  Content,
  Footer
} from "@mui-treasury/layout";
import { ContentMockUp } from "@mui-treasury/mockup/layout";
import {
  defaultLayoutPreset,
  standardLayoutPreset,
  fixedLayoutPreset,
  contentBasedLayoutPreset,
  cozyLayoutPreset,
  muiTreasuryPreset
} from "@mui-treasury/layout/presets";
import { createMuiTheme } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";
import MenuJson from "./layout/MenuJson";
import HeaderJson from "./layout/HeaderJson";
import NavHeaderJson from "./layout/NavHeaderJson";
import FooterJson from "./layout/FooterJson";

import "./App.css";

const presets = {
  createDefaultLayout: defaultLayoutPreset,
  createStandardLayout: standardLayoutPreset,
  createFixedLayout: fixedLayoutPreset,
  createContentBasedLayout: contentBasedLayoutPreset,
  createCozyLayout: cozyLayoutPreset,
  createMuiTreasuryLayout: muiTreasuryPreset
};

/* const Sidebar2 = ({ items }) => {
  return (
    <div className="sidebar">
      <List disablePadding dense>
        {items.map(({ label, name, items: subItems, ...rest }) => (
          <ListItem style={{ paddingLeft: 18 }} key={name} button {...rest}>
            <ListItemText>{label}</ListItemText>
            {Array.isArray(subItems) ? (
              <List disablePadding>
                {subItems.map(subItem => (
                  <ListItem key={subItem.name} button>
                    <ListItemText className="sidebar-item-text">
                      {subItem.label}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            ) : null}
          </ListItem>
        ))}
      </List>
    </div>
  );
}; */

const defaultMenuHeader = [
  { route: "/dashboard", title: "Dashboard" },
  { route: "/experimento", title: "Experimento" },
  { route: "/editor", title: "GutembergEditor" },
  { route: "/code/grid", title: "Chart Grid" },
  { route: "/code/locallayout", title: "Local Storage" },
  { route: "/instagram", title: "Instagram" },
  { route: "/styled", title: "StyledCards" },
  { route: "/infinite", title: "Infinite" },
  { route: "/griddashboard", title: "Grid-Dashboard" },
  { route: "/litegraph", title: "Litegraph.js" }
];

const defaultMenuSidebar = [
  {
    title: "Filtrar Assuntos",
    icon: "folder"
  },
  {
    title: "Adiciona Fonte",
    icon: "AddToQueue"
  },
  {
    title: "Conteúdos Populares",
    icon: "star"
  },
  {
    title: "Mais Recentes",
    icon: "schedule"
  },
  {
    title: "Adicionar Conteúdo Externo",
    icon: "publish"
  },
  {
    title: "Backup",
    icon: "backup"
  },
  {
    title: "Lixeira",
    icon: "delete"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuHeader: defaultMenuHeader,
      menuSidebar: defaultMenuSidebar
    };
  }

  render() {
    return (
      <Root presets={presets[0]}>
        {({ sidebarStyles, headerStyles }) => (
          <>
            <Header>
              <Toolbar>
                <SidebarTrigger className={headerStyles.leftTrigger}>
                  {/* headerStyles is from Root function as a child */}
                  <SidebarTriggerIcon />
                </SidebarTrigger>
                <HeaderJson items={this.state.menuHeader} />
              </Toolbar>
            </Header>
            <Sidebar>
              <div className={sidebarStyles.container}>
                <NavHeaderJson />
                <MenuJson items={this.state.menuSidebar} />
              </div>
              <CollapseBtn className={sidebarStyles.collapseBtn}>
                <CollapseIcon />
              </CollapseBtn>
            </Sidebar>
            <Content>
              <div className="App">
                <header className="App-header" />
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
                    <Route path="/styled" component={StyledCards} />
                    <Route path="/infinite" component={InfiniteDashboard} />
                    <Route path="/griddashboard" component={GridDashboard} />
                    <Route path="/litegraph" component={Litegraph} />
                    <Redirect to="/dashboard" />
                  </Switch>
                </section>
              </div>
            </Content>
            {/* <Footer>
              <FooterJson />
            </Footer> */}
          </>
        )}
      </Root>
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
