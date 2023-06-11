import { configureStore } from "@reduxjs/toolkit";
import UserAuth  from "./UserAuth";
import adminAuth from "./AdminAuth";
const Store = configureStore(
    {reducer:{user:UserAuth.reducer,Admin:adminAuth.reducer}}
)

export default Store