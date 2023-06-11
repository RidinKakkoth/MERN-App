import { configureStore } from "@reduxjs/toolkit";
import UserAuth  from "./UserAuth";
import AdminAuth from "./AdminAuth";
const Store = configureStore(
    {reducer:{user:UserAuth.reducer,Admin:AdminAuth.reducer}}
)

export default Store