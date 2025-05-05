import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBasket } from "../../services/Baskets.services";
import Swal from "sweetalert2";

function create() {
    const [Basket , setBasket] = useState({
        title : "",
        price : "",
    })
    const navigate = useNavigate();
    const createNewBasket= (event) =>{
        event.preventDefault();
        if(Basket.title === "" ||Basket.price === "" )
            Swal.fire({
                title: "Wrong",
                text: "All Inputs Are required",
                icon: "error"
            });
            else{
                addBasket(Basket)
                .then(()=>{
                    Swal.fire({
                        title: "Good job!",
                        text: "Added Succesfully",
                        icon: "success"
                    });
                    navigate("/");
                })
            }
    }
    return ( 
        <>
            <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Create Basket</h1>
            <section className="container w-50 mx-auto my-5">
            <form onSubmit={createNewBasket}>
                    <div className="form-group my-2">
                        <label htmlFor="title" className="fw-bolder">Course Title</label>
                        <input type="text" id="title" className="form-control"
                        onChange={e => setBasket({...Basket , title : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="price" className="fw-bolder">Course Price</label>
                        <input type="number" id="price" className="form-control"
                        onChange={e => setBasket({...Basket , price : e.target.value})}/>
                        </div>
                    <input type="submit" value="Add Basket" className="btn btn-dark my-2"/>
                </form>
            </section>
        </>
    );
}
export default create;