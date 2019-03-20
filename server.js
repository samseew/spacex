const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const app = express()

//with graphql, you only use /graphql as one endpoint route for the entire app
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))