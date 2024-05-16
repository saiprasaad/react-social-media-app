import { getDocs, collection } from "firebase/firestore"
import { database } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
    title: string;
    description: string;
    username: string;
    userId: string;
    id: string;
}

export function Main() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const postsRef = collection(database, "posts");
    async function getPosts() {
        const data = await getDocs(postsRef);
        setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Post[]);
    }

    useEffect(() => {
        getPosts();
    }, [])

    return <div>{posts?.map((post) => <Post post={post}/>)}</div>
}