const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

//mongoDB Atlas
mongoose.connect('mongodb+srv://Rk432:Qt6H5mqexzR43ZkE@cluster0.vm8w8.mongodb.net/itadakimasu?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});