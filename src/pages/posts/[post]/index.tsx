import type { PostsData } from "@/interfaces/interface"
import { useRouter } from "next/router"
import Link from "next/link"
const Post = (props:{
    data: PostsData
}) => {
    const router = useRouter();
    console.log(router.query);
if(props?.data?.hasOwnProperty("title") === false)
{
return <div className="flex items-center justify-center">Loading...</div>
}
return(
    <div className="flex flex-col gap-4 justify-center items-center w-full h-full p-2">
        {props?.data?.hasOwnProperty("title") === true && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
    <div className="flex flex-col gap-2 h-fit w-full">
        <Link
        className="hover:text-blue-300"
        href={"/posts"}
        >
        <span className="font-extrabold w-fit" >{"<- Posts"}</span>    
        </Link> 
        <div className="flex flex-row w-full justify-center">       
    <h3 className="text-center font-extrabold">{props?.data?.title}</h3>
    </div>
    </div>
    <div className="flex w-[80%] sm:w-[40%] bord p-2 border-blue-600 border-4 rounded-md">
    <p className="text-sm">{props?.data?.body}</p>
    </div>
    </div>
        )}
    </div>
)
}

export const getStaticPaths = async()  => {
    const responseData = await fetch("https://moeexposts.netlify.app/.netlify/functions/api/Getposts",{
        method: "GET"
    }).then(response => {return response.json()})
    console.log(responseData);
    const mappedIDs = responseData?.map((res: {
            _id: string;
        }) => {
            return {
                params: {
                    post: res?._id
                }
            }
        })
    return {
        paths: mappedIDs,
        fallback: false
    }
}

export const getStaticProps = async(context: {
    params: {
        post: number | string;
    }
})  => {
console.log(context?.params?.post);
const responseData = await fetch("https://moeexposts.netlify.app/.netlify/functions/api/Getposts",{
    method: "GET"
}).then(response => {return response.json()})
return {
    props: {
        data : responseData?.find((res: {
            _id: string;
        })  => res?._id === context.params.post)
    }
}


}

export default Post;