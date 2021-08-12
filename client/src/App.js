import React from "react";
import './App.css';

//components
import Nav from "./components/nav";
import Console from "./components/console";

//graphql Apollo client imports 
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Nav/>
        <Console/>
      </div>
    </ApolloProvider> 
  );
}

export default App;
