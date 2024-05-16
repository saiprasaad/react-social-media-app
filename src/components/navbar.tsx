import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export function Navbar() {
    const [user, loading, error] = useAuthState(auth);
    async function signUserOut() {
        await signOut(auth);
    }
    return <div className="navbar">
        <div className="links">
            <Link to="/">Home</Link>
            {!user && <Link to="/login">Login</Link>}
            {user && <Link to="/createpost">Create Post</Link>}
        </div>
        <div className="user">
            {user && (
                <div className="user-info-container">
                    <p>{user?.displayName}</p>
                    <img src={user?.photoURL || ""} width="20" height="20" />
                    <button className="logout-button" onClick={signUserOut}>Logout</button>
                </div>
            )}

        </div>
    </div>
}