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
    getDishbysubQuery,getCustomsQuery,getUserQuery,addUserMutation};