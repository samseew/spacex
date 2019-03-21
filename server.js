const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const path = require("path");

const app = express();

//allow cross-origin
app.use(cors());

//with graphql, you only use /graphql as one endpoint route for the entire app
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
