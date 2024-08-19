import axios from "axios";
import { useEffect, useState } from "react"
import { DATABASE_URL } from "../config";

export interface Blog {
    "title":string,
    "content":string,
    "id": string,
    "author": {
        "name": string
    }
}

export const useOneBlog = ({id}:{id:string}) => {
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${DATABASE_URL}/api/v1/blog/${id}`,{
            headers : {
                Authorization:'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response =>{
            setBlog(response.data.blog)
            setLoading(false)
        })
    },[id])


    return {
        loading,
        blog
    }
}

export const useBlog = () => {
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${DATABASE_URL}/api/v1/blog`,{
            headers : {
                Authorization:'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response =>{
            setBlogs(response.data.blogs)
            setLoading(false)
        })
    },[])


    return {
        loading,
        blogs
    }

}