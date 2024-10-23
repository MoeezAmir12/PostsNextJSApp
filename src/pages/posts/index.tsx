import axios from "axios";
import type { PostsData } from "@/interfaces/interface";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import AddPost from "@/Components/AddPost";

const Posts = (props: {
    data: PostsData[]
}) => {
    const router = useRouter();
    if(props?.data?.length === 0)
    {
        return <div className="flex w-full h-full items-center justify-center">Loading...</div>
    }
    const handlePostNavigation = (id: number) => {
    router.push({
        pathname: `/posts/${id}`
    })
    }
return(
<div className="flex flex-col gap-7 w-full h-full p-4">
<h1 className="flex flex-row p-2 w-full justify-center font-bold text-lg">Posts</h1>
<AddPost/>
<div className="flex flex-col p-2 w-full items-center gap-5">
    {props?.data?.length > 0 && props?.data?.map((post : {
        _id: number;
        title: string;
        body: string;
    }) => {
        return(
            <div key={post?._id} className="flex flex-col gap-2 w-[70%] p-2 h-fit rounded-md border-emerald-500 border-4 sm:w-[40%]">
                <h3 className="font-bold text-[20px]" onClick={()=> handlePostNavigation(post?._id)}>{post?.title}</h3>
                <p className="text-sm text-left text-[12px]">{post?.body}</p>
                </div>
        )
    })}
</div>
</div>
)
}
export const getServerSideProps = async() => {
try{
const responseData = await fetch("https://moeexposts.netlify.app/.netlify/functions/api/Getposts",{
    method: "GET"
}).then(response => {return response.json()})
return {
    props: {
        data: responseData
    }
}
}
catch(error: any)
{
    throw new Error(error.message);
}
}
export default Posts;