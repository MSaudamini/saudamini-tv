import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: "default usr",
})

export default UserContext;