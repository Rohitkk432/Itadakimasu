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
        customlist:{
            type: new GraphQLList(CustomizationType),
            resolve(parent, args){
                return Customization.find({customcatId:parent.id});
        }}
    })
});

const CustomizationType = new GraphQLObjectType({
    name: 'Customization',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLInt },
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
        customcatId1: { type: GraphQLString },
        customcatId2: { type: GraphQLString },
        restaurantId: { type: GraphQLString }
    })
});

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: ( ) => ({
        category: { type: GraphQLString },
    })
});

const SubCategoryType = new GraphQLObjectType({
    name: 'SubCategory',
    fields: ( ) => ({
        subcategory: { type: GraphQLString },
    })
});

const CustomsType = new GraphQLObjectType({
    name: 'Customs',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        showprice: { type: GraphQLInt },
        baseprice: { type: GraphQLInt },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        subcategory: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
        customcatId1:{
            type: CustomcatType,
            resolve(parent, args){
                return Customcat.findById(parent.customcatId1);
            }},
        customcatId2:{
            type: CustomcatType,
            resolve(parent, args){
                return Customcat.findById(parent.customcatId2);
            }}
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        restaurant:{
            type: RestaurantType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Restaurant.findById(args.id);
            }
        },
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
        },
        categories:{
            type: new GraphQLList(CategoryType),
            args: { restaurantId: { type: GraphQLString } },
            resolve(parent, args){
                return Dish.find({'restaurantId':args.restaurantId});
            }
        },
        subcategories:{
            type: new GraphQLList(SubCategoryType),
            args: { category: { type: GraphQLString } },
            resolve(parent, args){
                return Dish.find({'category':args.category});
            }
        },
        dishbysub:{
            type: new GraphQLList(DishType),
            args: { subcategory: { type: GraphQLString } },
            resolve(parent, args){
                return Dish.find({'subcategory':args.subcategory});
            }
        },
        customs:{
            type: CustomsType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Dish.findById(args.id);
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