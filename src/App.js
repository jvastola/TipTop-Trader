import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UserView from './pages/UserView'
import Navbar from './components/navbar.component'
import Footer from './components/footer.component';


function App() {
  return (
    <div className="container">
      <Navbar />
      <Router>
        <div className="container">
          <br />
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={SignupPage} />
          <Route path="/user/:id" component={UserView} />
      </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
