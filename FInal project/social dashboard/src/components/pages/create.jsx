import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addpost } from "../../services/courses.services";
import Swal from "sweetalert2";
function create() {
    const [post, setpost] = useState({
        title: "",
        desc: "",
        img: ""
    });
    const navigate = useNavigate();
    const createnewpost = (event ) =>{
        event.preventDefault();
        if(post.title === "" ||post.desc === " "
            ||post.img === " ")
            Swal.fire({
                text:"All Inputs Are required",
                icon:"warning",
                title:"Missing fields"
            });
            
            else{
                
                addpost(post)
                .then(()=>{
                    Swal.fire({
                        text:"product add Successfully",
                        icon:"success",
                        title:"well done"
                    });
                    navigate("/home");
                })
            }
    }
    return ( 
        <>  
        <h1 className="bg-dark text-center py-3 shadow  text-white mt-2 fs-5 border w-50 rounded-3 mx-auto">create post</h1>
        <section className="container w-50 mx-auto">
            <form onSubmit={createnewpost}>
                <div className="form-group my-2">
                    <label htmlFor="" className="fw-bold" >product title</label>
                    <input type="text" className="form-control" id="title"onChange={e=>setpost({...post,title :e.target.value})}/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="" className="fw-bold">product desc</label>
                    <textarea className="form-control" id="desc"onChange={e=>setpost({...post,desc:e.target.value})} />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="" className="fw-bold" >upload image</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="img"
                        onChange={e=>setpost({...post,img :e.target.files[0]})}
                    />
                </div>
                <input type="submit" className="btn btn-dark" value="Add post" />
            </form>
        </section>
        </>
    );
}
export default create;