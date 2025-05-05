import { useEffect, useState } from "react";
import { getBaskets } from "../../services/Baskets.services";
import { Link } from "react-router-dom";
import { deleteBasket } from "../../services/Baskets.services";
import Swal from "sweetalert2";

function Home() {
const [Basket, setBasket] = useState([]);

useEffect(() => {
    getBaskets()
    .then((res) => setBasket(res.data));
    }, [Basket]);

const deleteBasket1 = (id) =>{
    deleteBasket(id)
    .then(() => {Swal.fire({
        title: "Good job!",
        text: "Deleted Succesfully",
        icon: "success",
        color: "red"
    });})
}
const confirmReservation = (id) =>{
    deleteBasket(id)
    .then(() => {Swal.fire({
        title: "Good job!",
        text: "Booking confirmed",
        icon: "success",
    });})
}

    return (
        <>
        <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">Basket</h1>
        <section className="my-5 container">
            <table className="table table-bordered table-hover text-center">
                <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
                </tr>
            </thead>
            {
            Basket.length &&
            <tbody>
                {
                    Basket.map((Basket, index) => (
                        <tr key={Basket.id}>
                            <td>{index + 1}</td>
                            <td>{Basket.title}</td>
                            <td>{Basket.price}</td>
                            <td>
                                <Link to={`/${Basket.id}`} className="btn btn-sm btn-info mx-1">Show</Link>
                                <Link to={`/edit/${Basket.id}`} className="btn btn-sm btn-success mx-1">Edit</Link>
                                <button onClick={() => deleteBasket1(Basket.id)} className="btn btn-sm btn-danger mx-1">Delete</button>
                                <button onClick={() => confirmReservation(Basket.id)} className="btn btn-sm btn-warning mx-1">Comfirm Reservation</button>
                            </td>
                        </tr>
                    )
                    )
                }
            </tbody>
            }
            </table>
        </section>
        </>
    );
    }

export default Home;
