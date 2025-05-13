import { useRef } from "react";
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
    const form = useRef();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
        "service_6fxerah",
        "template_x2uihbj",
        form.current,
        {
            publicKey: "n6ziwUapCp4aPst5z"
        }
        ).then(() => {
        Swal.fire({   
        title: "Good job!",
        text: "Your Email was sent successfully",
        icon: "success"
        });
        navigate("/");
    }, (error) => {
        console.error(error.text);
    });
    };

    return (
    <div className="container py-5" style={{ background: "#F7F7F7", borderRadius: "50px" ,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    }}>
        <div className="row">
        <div className="col-md-12 text-center mb-4">
            <h2 className="fw-bold">Contact Us</h2>
            <p className="text-muted">Feel free to drop us a line below!</p>
        </div>
        <div className="col-md-8 offset-md-2">
            <form ref={form} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name:</label>
                <input
                type="text"
                name="fullName"
                className="form-control border-0 border-bottom rounded-0"
                id="fullName"
                placeholder="Enter full name"
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                type="email"
                name="email"
                className="form-control border-0 border-bottom rounded-0"
                id="email"
                placeholder="Enter email address"
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone:</label>
                <input
                type="tel"
                name="phone"
                className="form-control border-0 border-bottom rounded-0"
                id="phone"
                placeholder="Enter phone number"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="message" className="form-label">Message:</label>
                <textarea
                name="message"
                className="form-control border-0 border-bottom rounded-0"
                id="message"
                rows="3"
                placeholder="Your Comment..."
                required
                ></textarea>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success px-5 py-2 rounded-pill">
                Submit &nbsp; ➝
                </button>
            </div>
            </form>
        </div>
        </div>
    </div>
    );
    }

export default Contact;
