const express = require('express');
const dotenv = require("dotenv");
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

dotenv.config();

// allow cross-origin requests
app.use(cors());

//mongoDB Atlas
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vm8w8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

//test 
app.get('/', (req, res) => res.send('Hello from Express!'));

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT || 4000, () => {
    console.log(`now listening for requests on port ${process.env.PORT || 3000}`);
});