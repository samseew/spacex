//all the graphql stuff here
const axios = require('axios')
const fetch = require("node-fetch");

//so every set of data you wanna grab is essentially an object type 
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql')

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({ // these are the fields you are grabbing from the giant API
        flight_number: {
            type: GraphQLInt
        },
        mission_name: {
            type: GraphQLString
        },
        launch_year: {
            type: GraphQLString
        },
        launch_date_local: {
            type: GraphQLString
        },
        launch_sucess: {
            type: GraphQLBoolean
        },
        rocket: { // RocketType is a whole separate object type, this way we create a nested object type
            type: RocketType
        }
    })
})


//Rocket Type
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({ // these are the fields you are grabbing from the giant API
        rocket_id: {
            type: GraphQLString
        },
        rocket_name: {
            type: GraphQLString
        },
        rocket_type: {
            type: GraphQLString
        }
    })
})

//Root Query - this is actually using the nested object type we created and getting it 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args) {
                // return axios.get('https://api.spacexdata.com/v3/launches').then(res => res.data)
                return fetch('https://api.spacexdata.com/v3/launches').then(res => res.json())
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})