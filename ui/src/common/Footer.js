import React from 'react';

import packageJson from '../../package.json';

class Footer extends React.Component {

    /**
     * Custom constructor.
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            version: null
        };

        this.updateVersion = this.updateVersion.bind(this);
    }

    /**
     * ReactJS: Method is invoked immediately after a component is mounted.
     */
    componentDidMount() {

        // trigger continuous updates
        this.updateVersion();
    }

    /**
     * Update version
     */
    updateVersion() {

        fetch("/version")
            .then(response => {
                if (200 === response.status) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(version => {
                this.setState({ version: version });
            });
    }


    /**
     * Return HTML snippet
     */
    render() {

        // final output
        return (
            <div className="footer fixed-bottom">
                <div className="container-fluid bg-dark p-2 text-light">
                    <div className="row row-cols-2">
                        <div className="col">
                            Butane Converter
                        </div>
                        <div className="col text-end">
                            Apache License 2.0
                        </div>
                    </div>
                    <div className="row row-cols-2 pt-2">
                        <div className="col">
                            {this.state.version ? "v" + this.state.version.appVersion : 'n. a.'}<span className="text-secondary"><i>&nbsp;&nbsp;·&nbsp;&nbsp;Client: v{packageJson.version}</i></span>
                        </div>
                        <div className="col text-end">
                            {this.state.version ? this.state.version.butaneVersion : 'n. a.'}<i className="text-secondary">&nbsp;&nbsp;·&nbsp;&nbsp;<a className="text-secondary text-decoration-none" target="_blank" href="https://quay.io/repository/coreos/butane?tab=tags">versions</a></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
