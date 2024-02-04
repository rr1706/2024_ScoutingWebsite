import { useContext } from "react";
import AuthenticationContext from "./Auth/AuthenticationContext";
import Authorized from "./Auth/Authortized";
import { logout } from "./Auth/handleJWT";
import Login from "./Auth/Login";
import Button from "./Utils/Button";
import EventSelector from "./Utils/EventSelector";

export default function LandingPage() {
    const { update, claims } = useContext(AuthenticationContext);

    function getEmail(): string {
        return claims.filter(x => x.name === "email")[0]?.value;
    }
    return (
        <>
            <Authorized
                authorized={
                    <div className="container">
                        <h3 className="text-center align-middle RRBlue">Welcome {getEmail()}</h3>
                        <div className="w-25 mb-3">Current Event:<EventSelector /> </div>
                        <Button className="btn btn-primary"
                            onClick={() => {
                                logout();
                                update([]);
                            }}
                        >Log out</Button>
                    </div>


                }
                notAuthorized={<Login />}
            />
        </>
    )
}