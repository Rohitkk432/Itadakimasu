// import {React,useEffect,useCallback} from 'react';

// import {useHistory} from 'react-router-dom';

// //graphql
// import { graphql } from 'react-apollo';
// import { getUserQuery,addUserMutation } from '../../queries/queries';
// import {flowRight as compose} from 'lodash';

// function Logger(params) {
//     let history = useHistory();

//     const [currentuser,setCurrentuser]=params.usersetter;

//     const loggerfunc =useCallback(async()=>{
//         if (params.getUserQuery.user){
//             console.log('entered if');
//             console.log(params.getUserQuery.user);
//             // setCurrentuser(params.getUserQuery);
//         }
//         else if (params.loggeremail){
//             console.log('entered else');
//             const user = await params.addUserMutation({
//                 variables: {
//                     name:params.loggername,
//                     email:params.loggeremail,
//                 },
//             });
//             console.log(user);
//             setCurrentuser(user);
//         }
//         console.log(params);
//         history.push('/home')
//     },[setCurrentuser,params,history]);

//     useEffect(()=>{
//         if(params.loggeremail){
//             loggerfunc();
//         }
//     },[params.loggeremail,loggerfunc])

//     return (
//         <>   
//         </>
//     )
// }

// export default compose(
//     graphql(getUserQuery, {
//         options: (params) => {
//             return {
//                 variables: {
//                     email:params.loggeremail,
//                 }
//             }
//         },
//         name: "getUserQuery" 
//     }),
//     graphql(addUserMutation, {name: "addUserMutation"})
// )(Logger);