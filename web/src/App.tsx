import React, { Suspense, useState } from "react";
import clsx from "clsx";

import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { translationEn } from "./lang/translation";
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { styleTheme, themeType } from "./config/theme";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Dashboard from "./components/Dashboard/Dashboard";
import { Types } from "./components/Reports/Types/Types";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    marginTop: 64,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginTop: 64,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const App = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState(styleTheme);

  const storageThemeType: any = localStorage.getItem("themeType");
  const openDrawer: any = localStorage.getItem("openDrawer");

  let type: any = themeType.light;
  if (
    storageThemeType === themeType.light ||
    storageThemeType === themeType.dark
  ) {
    type = storageThemeType;
  }

  const [values, changeTheme] = useState({
    type: !storageThemeType ? theme.palette.type : type,
    drawer: !openDrawer ? true : openDrawer === "false" ? false : true,
  });

  const handleChangeTheme = (key: string, type: any) => {
    if (key === "drawer") {
      localStorage.setItem("openDrawer", type);
      setOpen(type);
    } else {
      localStorage.setItem("themeType", type);
    }

    changeTheme((values) => ({
      ...values,
      [key]: type,
    }));
  };

  const toggleDarkTheme = () => {
    const type: any = values.type === themeType.light ? themeType.dark : themeType.light;
    const style: any = Object.assign({}, styleTheme, {
      palette: Object.assign({}, styleTheme.palette, { type: type }),
    });

    handleChangeTheme("type", type);
    setTheme(style);
  };

  const muiTheme = createMuiTheme({
    palette: {
      type: values.type,
      primary: styleTheme.palette.primary,
    },
    //overrides: styleTheme.overrides
  });

  const closeDrawer = () => {
    if (window.innerWidth <= 960) {
      setOpen(false);
    } else {
      setOpen(values.drawer);
    }
  };

  const handleResize = () => {
    closeDrawer();
  };

  window.addEventListener("load", closeDrawer);
  window.addEventListener("resize", handleResize);

  const [open, setOpen] = useState(values.drawer);

  return (
    <Suspense fallback="Loading...">
      <MuiThemeProvider theme={muiTheme}>
        <div className="App">
          <div className={classes.root}>
            <CssBaseline />

            <Header
              handleChangeTheme={handleChangeTheme}
              toggleThemeColor={toggleDarkTheme}
              drawerWidth={drawerWidth}
              translation={t}
              open={open}
            />

            <nav className={classes.drawer} aria-label="mailbox folders">
              <Menu
                handleChangeTheme={handleChangeTheme}
                drawerWidth={drawerWidth}
                translation={t}
                open={open}
              />
            </nav>

            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <Switch>
                <Route path="/" component={Dashboard} exact />
                <Route path="/report/occurenceType" component={Types} exact />
                <Route component={Dashboard} />
              </Switch>
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    </Suspense>
  );
};

export default App;
