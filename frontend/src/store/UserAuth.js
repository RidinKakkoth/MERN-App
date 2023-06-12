import {createSlice} from "@reduxjs/toolkit"

const UserAuth = createSlice({
    name:"user",
    initialState:{
        userToken:null,
        userName:null
    },
    reducers:{
        userAddDetails(state,action){
            const newItem = action.payload;
            state.userName =newItem.name
            state.userToken = newItem.token 
            console.log(newItem,"nwwwwwwwwwwwwwwwwwwwww");
            
        },
        userLogout(state,action){
            state.userName=""
            state.userToken=""
        }
    }
})

export const {userAddDetails,userLogout} = UserAuth.actions
export default UserAuth