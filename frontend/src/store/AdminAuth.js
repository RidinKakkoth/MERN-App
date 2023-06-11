import { createSlice } from "@reduxjs/toolkit";


const adminAuth=createSlice({

        name:"admin",
        initialState:{
            adminToken:null
        },
        reducers:{
            adminAdd(state,actions){
                const newItem=actions.payload
                
                state.adminToken=newItem.token
            },
            adminLogout(state,actions){
                state.token=""
            }
        }
})

export const adminActions=adminAuth.actions
export default adminAuth