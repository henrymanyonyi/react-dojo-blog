import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Henry');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleNewBlog = (e) => {
        e.preventDefault();
        const newBlog = {title, body, author};

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBlog)
        })
        .then(()=>{
            setIsPending(false);
            history.push('/');
        })
    }

    return ( 
        
        <div className="create">
            <h2>Add new blog</h2>
            <form onSubmit={handleNewBlog}>
                <label>Blog title:</label>
                <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

                <label>Blog body:</label>
                <textarea 
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <label>Blog author:</label>
                <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="">Henry</option>
                </select>

                {!isPending && <button>Add blog</button>}
                {isPending && <button>Adding blog</button>}
                
            </form>
        </div>
     );
}
 
export default Create;