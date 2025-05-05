import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBasket, getBasket, updateBasket } from "../../services/Baskets.services";
import Swal from "sweetalert2";

function edit() {
    const id = useParams().id
    const [Basket , setBasket] = useState({
        id : id,
        title : "",
        price : "",
    })
    useEffect(()=>{
        getBasket(id)
        .then(res => setBasket(res.data))
    } , [])
    const navigate = useNavigate();

    const editBasket = (event) =>{
        event.preventDefault()
        if(Basket.title === "" ||Basket.price === "" )
            Swal.fire({
                title: "Wrong",
                text: "All Inputs Are required",
                icon: "error"
            });
        else{
            updateBasket( id , Basket )
            .then(() => {Swal.fire({
                title: "Good job!",
                text: "Added Succesfully",
                icon: "success"
            });})
            navigate("/")
        }
    }
    return ( 
        <>
            <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Create Basket</h1>
            <section className="container w-50 mx-auto my-5">
            <form onSubmit={editBasket}>
                    <div className="form-group my-2">
                        <label htmlFor="title" className="fw-bolder">Basket Title</label>
                        <input type="text" id="title" className="form-control"
                        value={Basket.title}
                        onChange={e => setBasket({...Basket , title : e.target.value})}/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="price" className="fw-bolder">Basket Price</label>
                        <input type="number" id="price" className="form-control"
                        value={Basket.price}
                        onChange={e => setBasket({...Basket , price : e.target.value})}/>
                        </div>
                    <input type="submit" value="Edit Basket" className="btn btn-dark my-2"/>
                </form>
            </section>
        </>
    );
}
export default edit;