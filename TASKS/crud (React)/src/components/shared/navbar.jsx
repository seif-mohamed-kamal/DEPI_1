import { Link } from "react-router-dom";
import reactLogo from '../../assets/react.svg'

function navbar() {
    return ( 
        <>
            {/* <nav className="navbar navbar-expand-lg bg-dark py-4">
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
            </nav> */}
    <nav className="navbar bg-body-tertiary">
    <div className="container-fluid d-flex flex-column flex-sm-row align-items-center justify-content-between text-center text-sm-start justify-content-around">

    {/* Brand - always visible and centered on xs */}
    <a className="navbar-brand mx-auto mx-sm-0" href="#">
    Social media dashboard<br />
    <span className="fs-6 text-center d-block" style={{ marginTop: '-10px' }}>
    account created
    </span>
</a>

    {/* Wrapper for search and logo */}
    <div className="d-flex flex-column flex-sm-row align-items-center gap-2 mt-3 mt-sm-0">

        <form className="d-flex" role="search">
        <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
            Search
        </button>
        </form>

        <img
        src={reactLogo}
        alt="Logo"
        width="30"
        height="24"
        className="d-inline-block align-text-top"
        />
    </div>

    </div>
</nav>



        </>
    );
}

export default navbar;