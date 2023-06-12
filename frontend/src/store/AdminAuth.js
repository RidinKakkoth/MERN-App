import { createSlice } from "@reduxjs/toolkit";


const adminAuth=createSlice({

        name:"admin",
        initialState:{
            adminToken:null
        },
        reducers:{
            adminAdd(state,action){
                const newItem=action.payload
                
                state.adminToken=newItem.token
            },
            adminLogout(state,action){
                state.adminToken=""
            }
        }
})

// export const adminActions=adminAuth.action
export const { adminAdd, adminLogout } = adminAuth.actions;
export default adminAuth