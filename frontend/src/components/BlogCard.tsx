import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

interface blogCardType{
    authorName : string,
    title:string,
    content:string,
    publishedDate: string,
    id:string
}

export const BlogCard =  ({authorName,title,content,publishedDate,id}:blogCardType) => {

    return <div className="flex justify-center">
    <div className=" border-b py-5 w-1/2 ">
    <Link to={`/blog/${id}`}>
    <div className="flex">
        {/* <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
        </div> */}
        <Avatar size="small" name="Shaan"/>
        <div className="flex flex-col justify-center pl-2">
            <div className="flex justify-center text-sm">
                <div className="font-normal" >
                    {authorName} 
                </div>
                <div className="text-slate-400 text-xs font-extralight px-1">
                    &#9679;
                </div>
                <div className="text-slate-500 font-normal">
                    {publishedDate}
                </div>
            </div>
        </div>
    </div>
    
    <div className="font-bold text-2xl pt-3">
        {title}
    </div>
    </Link>
    <div className="font-medium text-base text-slate-500 pt-1">
        {content.slice(0,100) + '...'}
    </div>
    <div className="font-medium text-sm text-slate-500 pt-5">
        {`${Math.ceil(content.length/100)} minutes`}
    </div>
</div>
</div>
} 

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}