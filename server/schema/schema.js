const graphql = require('graphql');
const Restaurant = require('../models/restaurant');
const Dish = require('../models/dish');
const Customcat = require('../models/customcat');
const Customization = require('../models/customization');

const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    // GraphQLID,
    GraphQLInt,
    GraphQLList,
    // GraphQLNonNull
} = graphql;

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        rating: { type: GraphQLString },
        pricing: { type: GraphQLString },
    })
});

const CustomcatType = new GraphQLObjectType({
    name: 'Customcat',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    })
});

const CustomizationType = new GraphQLObjectType({
    name: 'Customization',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
        //left
    })
});

const DishType = new GraphQLObjectType({
    name: 'Dish',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        showprice: { type: GraphQLInt },
        baseprice: { type: GraphQLInt },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        subcategory: { type: GraphQLString },

    })
});

// const categoryType = new GraphQLObjectType({
//     name: 'Category',
//     fields: ( ) => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//     })
// });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // author: {
        //     type: AuthorType,
        //     args: { id: { type: GraphQLID } },
        //     resolve(parent, args){
        //         return Author.findById(args.id);
        //     }
        // },
        restaurants: {
            type: new GraphQLList(RestaurantType),
            resolve(parent, args){
                return Restaurant.find({});
            }
        },
        customizations: {
            type: new GraphQLList(CustomizationType),
            resolve(parent, args){
                return Customization.find({});
            }
        },
        customcats: {
            type: new GraphQLList(CustomcatType),
            resolve(parent, args){
                return Customcat.find({});
            }
        },
        dishs: {
            type: new GraphQLList(DishType),
            resolve(parent, args){
                return Dish.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRestaurant: {
            type: RestaurantType,
            args: {
                name: { type: GraphQLString },
                location: { type: GraphQLString },
                rating: { type: GraphQLString },
                pricing: { type: GraphQLString },
            },
            resolve(parent, args){
                let restaurant = new Restaurant({
                    name: args.name,
                    location: args.location,
                    rating: args.rating,
                    pricing: args.pricing,
                });
                return restaurant.save();
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});