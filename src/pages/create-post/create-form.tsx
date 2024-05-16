import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
    title: string;
    description: string;
}

export function CreateForm() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        title: yup.string().required("You must provide a title"),
        description: yup.string().required("You must provide a description")
    })
    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(database, "posts");

    async function onCreatePost(data: CreateFormData) {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate("/")
    }

    return <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title..." {...register("title")} />
        {errors.title != null && <p style={{ color: "red" }}>{errors.title.message}</p>}
        <textarea placeholder="Description..." {...register("description")} />
        {errors.description != null && <p style={{ color: "red" }}>{errors.description.message}</p>}
        <br></br>
        <input type="submit"  className="submitForm"/>
    </form>
}