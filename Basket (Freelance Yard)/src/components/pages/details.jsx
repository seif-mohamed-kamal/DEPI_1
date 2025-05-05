import { useState , useEffect} from "react";
import { getBasket } from "../../services/Baskets.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function details() {
    const [Basket , setBasket] = useState([])
    const id = useParams().id
    const navigate = useNavigate();
    useEffect(() =>{
            getBasket(id)
            .then(res => setBasket(res.data))
        } 
    , [])
    const redirectToHome = () =>{
        navigate("/");
    }
    return (  
        <>
            <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Basket Details</h1>
            <section className="cantainer w-50 mx-auto text-center">
                <div class="card">
                    <div class="card-header">
                        {Basket.title}
                    </div>
                    <div class="card-body">
                        <p class="card-text">{Basket.price}</p>
                        <button onClick={redirectToHome} className="btn btn.bordered bg-dark text-white text-center">Return</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default details;