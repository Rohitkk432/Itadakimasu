import { gql } from 'apollo-boost';

const getUsersQuery = gql`
    {
        users{
            name
            id
            email
        }
    }
`;
const getUserQuery = gql`
    query GetUser($email: String!){
        user(email: $email) {
            name
            email
            id
        }
    }
`;
const addUserMutation = gql`
    mutation AddUser($name: String!, $email: String!){
        addUser(name: $name, email: $email){
            name
            email
            id
        }
    }
`;

const addOrderMutation = gql`
    mutation addOrder($userId : String!, $dishId : String!, $customizationId1 : String!, $customizationId2 : String!, $showprice : String!, $finalprice : String!, $status: String!){
        addOrder(userId : $userId, dishId : $dishId, customizationId1 : $customizationId1, customizationId2 : $customizationId2, showprice: $showprice, finalprice: $finalprice, status: $status){
            id
            userId
            dishId
            customizationId1
            customizationId2
            showprice
            finalprice
            status
        }
    }
`;

const getSpecificOrdersQuery = gql`
    query GetCurrentOrders($userId : String!, $status : String!){
        order(userId: $userId, status: $status){
            userId
            dishId
            status
            showprice
            finalprice
            id
            dishinfo{
                id
                name
            }
        }
    }
`;

const deleteOrder = gql`
    mutation deleteOrder($id : String!){
        deleteOrder(id:$id){
            id
            userId
            dishinfo{
                name
            }
        }
    }
`;

const  payOrder = gql`
    mutation payOrder($userId : String!){
        payOrder(userId:$userId){
            id
        }
    }
`;

const getRestaurants = gql`
    {
        restaurants{
            name
            pricing
            rating
            location
            id
        }
    }
`;
const getRestQuery = gql`
    query GetRest($id: String!){
        restaurant(id: $id) {
            name
            pricing
            rating
            location
            id
        }
    }
`;
const getCategoryQuery = gql`
    query GetCategory($id: String!){
        categories(restaurantId: $id) {
            category
        }
    }
`;

const getSubCategoryQuery = gql`
    query GetSubCategory($category: String!){
        subcategories(category: $category) {
            subcategory
        }
    }
`;

const getDishbysubQuery = gql`
    query GetDishbysub($subcategory: String!){
        dishbysub(subcategory: $subcategory) {
            id
            name
            showprice
            baseprice
            description
            category
            subcategory
            restaurantId        
        }
    }
`;

const getCustomsQuery = gql`
    query GetCustoms($id : String!){
        customs(id: $id){
            id
            name
            showprice
            baseprice
            description
            customcatId1{
                id
                name
                customlist{
                    id
                    name
                    price
                }
            }
            customcatId2{
                id
                name
                customlist{
                    id
                    name
                    price
                }
            }
        }
    }
`;

export {getRestaurants,getRestQuery,getCategoryQuery,getSubCategoryQuery,getUsersQuery,
    getDishbysubQuery,getCustomsQuery,getUserQuery,getSpecificOrdersQuery,addUserMutation,
    addOrderMutation,deleteOrder,payOrder};