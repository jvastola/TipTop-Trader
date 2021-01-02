import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import SignupPage from './components/pages/SignupPage'
import UserView from './components/pages/UserView'
import Footer from './components/footer.component';


function App() {
  return (
    <div className="container">
      <Router>
        <div className="container">
          <br />
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={SignupPage} />
          <Route path="/user:id" component={UserView} />
      </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
