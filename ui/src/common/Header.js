import React from 'react';

class Header extends React.Component {


    /**
     * Return HTML snippet
     */
    render() {

        // final output
        return (
            <div>
                <nav className="navbar bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Butane Converter</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Butane Converter</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="https://github.com/meixxi/butane-converter">Project Sources <small><i>(github.com)</i></small></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="https://www.linkedin.com/in/meiXXI">About the Author <small><i>(linkedin.com)</i></small></a>
                                    </li>
                                    <li className="nav-item">
                                        &nbsp;
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="https://coreos.github.io/butane">CoreOS Butane</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;

