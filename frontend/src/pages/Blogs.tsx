import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlog } from "../hooks"

export const Blogs =  () => {

    const { loading,blogs } = useBlog();
    if(loading){
        return <div>
            <AppBar/> 
            <div className="flex justify-center">
            <div className="border-b py-5 w-1/2 ">
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
            </div>
        </div>
        </div>
    }

    return <div>
        <AppBar/>
        {blogs.map(blog => <BlogCard key={blog.id} 
            id={blog.id}
            authorName={blog.author.name || 'Anonymous'}
            title={blog.title} 
            content={blog.content}
            publishedDate={'2nd Feb 2024'}
        />)}
    </div>
} 