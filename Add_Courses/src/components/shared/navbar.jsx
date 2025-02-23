import { Link } from "react-router-dom";
function navbar() {
    return ( 
        <>
            <nav className="navbar navbar-expand-lg bg-dark py-4">
                <div className="container">
                    <Link className="navbar-brand fs-4 fw-bold text-white" to="#">React</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link fs-5 mx-auto text-white" to="/">Home</Link>
                            <Link className="nav-link fs-5 mx-auto text-white" to="/create">Create Course</Link>
                            <Link className="nav-link fs-5 mx-auto text-white" to="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default navbar;