import { createContext } from "react";

/*
the authContext contains two values
auth -- an object that contains the id, email and token values
setAuth -- a way to change auth
*/

const authContext = createContext(null);

export default authContext;
