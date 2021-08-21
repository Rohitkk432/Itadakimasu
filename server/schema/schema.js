const graphql = require('graphql');
const Restaurant = require('../models/restaurant');
const Dish = require('../models/dish');
const Customcat = require('../models/customcat');
const Customization = require('../models/customization');
const User = require('../models/user');
const Order = require('../models/order')

const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    // GraphQLNonNull
} = graphql;

//Types

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLString },
        userId: { type: GraphQLString },
        dishId: { type: GraphQLString },
        customizationId1: { type : GraphQLString },
        customizationId2: { type : GraphQLString },
        showprice: { type: GraphQLString },
        finalprice: { type: GraphQLString },
        status: { type: GraphQLString },
        dishinfo:{
            type: DishType,
            resolve(parent, args){
                return Dish.findById(parent.dishId);
            }},
    })
});

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


//Queries and Mutations

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //All Data of tables
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
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
            }
        },

        //Specific Data
        user:{
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve(parent, args){
                return User.findOne({email:args.email});
            }
        },
        order:{
            type: new GraphQLList(OrderType),
            args: { 
                userId: { type: GraphQLString },
                status: { type: GraphQLString },
            },
            resolve(parent, args){
                return Order.find({userId:args.userId,status:args.status});
            }
        },
        restaurant:{
            type: RestaurantType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Restaurant.findById(args.id);
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
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email : { type:GraphQLString }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    email : args.email,
                });
                return user.save();
            }
        },
        addOrder: {
            type: OrderType,
            args: {
                userId: { type: GraphQLString },
                dishId: { type:GraphQLString },
                customizationId1: { type : GraphQLString },
                customizationId2: { type : GraphQLString },
                showprice: { type: GraphQLString },
                finalprice: { type: GraphQLString },
                status: { type: GraphQLString }
            },
            resolve(parent, args){
                let order = new Order({
                    userId : args.userId,
                    dishId : args.dishId,
                    customizationId1 : args.customizationId1,
                    customizationId2 : args.customizationId2,
                    showprice : args.showprice,
                    finalprice : args.finalprice,
                    status : args.status
                });
                return order.save();
            }
        },
        deleteOrder: {
            type: OrderType,
            args: {
                id : { type : GraphQLString },
            },
            resolve(parent, args){
                return Order.findByIdAndDelete(args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});