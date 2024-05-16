import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { Post as IPost } from "./main"
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost
}

interface Like {
    likeId: string;
    userId: string;
}

export function Post(props: Props) {
    const likesRef = collection(database, "likes");
    const likesDoc = query(likesRef, where("postId", "==", props.post.id));
    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState<Like[] | null>(null);

    async function getLikes() {
        const likesData = await getDocs(likesDoc);
        setLikes(likesData.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
    }

    async function addLike() {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: props.post.id})
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id}] : [{ userId: user.uid, likeId: newDoc.id }])
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function removeLike() {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", props.post?.id), where("userId", "==", user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(database, "likes", likeToDeleteData.docs[0].id);
            await deleteDoc(likeToDelete)
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch (err) {
            console.log(err);
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, [])

    return <div>
        <div className="title">
            <h1>{props.post.title}</h1>
        </div>
        <div className="body">
            <p>{props.post.description}</p>
        </div>
        <div className="footer">
            <p>{props.post.username}</p>
        </div>
        <div className="title">
            <p>@{props.post.title}</p>
            <button onClick={hasUserLiked? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
            {likes && <p>Likes: {likes?.length}</p>}
        </div>
    </div>
}