import { gql } from 'apollo-boost';

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

export {getRestaurants,getRestQuery,getCategoryQuery,getSubCategoryQuery};