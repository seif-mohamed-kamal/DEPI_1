import { useRef } from "react";
import emailjs from '@emailjs/browser'
import Swal from "sweetalert2";
import { useNavigate, useNavigation } from "react-router-dom";
function contact() {

    const form = useRef();
    const navigate = useNavigate();
    const handle = (e) =>{
        e.preventDefault();
        emailjs.sendForm("service_6fxerah" , "template_x2uihbj" ,
            form.current , {
                publicKey : "n6ziwUapCp4aPst5z"
            })
            .then(()=>{
                Swal.fire({
                    title: "Good job!",
                    text: "Your Email Send Succesfully",
                    icon: "success"
                });
                navigate("/")
            } , (error) => {
                console.log(error.text)
            })
    }
    return (  
        <>
            <h1 className="bg-dark py-3 text-white fs-5 text-center mt-2">contact</h1>
            <section className="container w-50 mx-auto my-5">
            <form ref={form} onSubmit={handle}>
                    <div className="form-group my-2">
                        <label htmlFor="name" className="fw-bolder">Name</label>
                        <input type="text" id="name" className="form-control"/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="email" className="fw-bolder">Email</label>
                        <input type="text" id="email" name = "email" className="form-control"/>
                        </div>
                    <div className="form-group my-2">
                        <label htmlFor="message" className="fw-bolder">Message</label>
                        <textarea type="text" id="message" name = "message" className="form-control"></textarea>
                    </div>
                    <input type="submit" value="Send Email" className="btn btn-dark my-2"/>
                </form>
            </section>
        </>
    );
}

export default contact;