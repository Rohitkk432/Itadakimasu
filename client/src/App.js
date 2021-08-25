import React from "react";
import './App.css';

//components
import Mainpage from "./components/mainpage";
import Loginpage from "./components/loginpage";
import CheckoutPage from "./components/checkoutpage";
import Deliverypage from "./components/deliverypage";

//React-router
import { BrowserRouter as Router, Route } from "react-router-dom";

//graphql Apollo client imports 
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
    // uri: 'http://localhost:4000/graphql'
    uri: `https://itadakimasu-server.herokuapp.com/graphql`
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Route path="/" exact component={Loginpage} />
          <Route path="/home" exact component={Mainpage} />
          <Route path="/checkout" exact component={CheckoutPage} />
          <Route path="/delivery" exact component={Deliverypage} />
        </div>
      </Router>
    </ApolloProvider> 
  );
}

export default App;
