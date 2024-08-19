import { useParams } from "react-router-dom"
import { useOneBlog } from "../hooks"
import { AppBar } from "../components/AppBar"
import { FullBlog } from "../components/FullBlog"
import { Spinner } from "../components/Spinner"


export const Blog =  () => {
    const { id } = useParams()
    const { blog , loading } = useOneBlog({
        id:id || ""
    })
    if(loading || !blog){
        return <div>
            <AppBar/>

            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }

    return <div>
        <FullBlog blog={blog}/>
    </div>
} 