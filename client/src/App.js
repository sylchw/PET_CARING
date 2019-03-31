import React, { Component } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/nav/Navbar';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#f48b94' },
    secondary: { main: '#f6a7a5' },
  },
  typography: { fontFamily: '"Open Sans", sans-serif' },
})

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <ToastContainer />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
