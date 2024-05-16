import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    async function signInWithGoogle() {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate("/");
    }

    return <div><p>Sign in with Google to Continue</p>
    <button onClick = {signInWithGoogle}>Sign in with Google</button></div>
}