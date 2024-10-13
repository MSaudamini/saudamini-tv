import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Header = () => {
    const data = useContext(UserContext);

    return (
        <div>
            Header 111
            {data.loggedInUser}
        </div>
    )
}
export default Header;