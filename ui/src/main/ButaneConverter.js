import React from 'react';

class ButaneConverter extends React.Component {

    /**
     * Custom constructor.
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.state = {
            butaneSpec: "",
            ignitionSpec: "",
            cursorPosition: ""
        };

        this.refButaneSpecLineNumbers = React.createRef();

        this.modifyButaneSpec = this.modifyButaneSpec.bind(this);
        this.convertButaneSpec = this.convertButaneSpec.bind(this);
        this.computeCursorPosition = this.computeCursorPosition.bind(this);
        this.syncScrollButaneSpecLineNumbers = this.syncScrollButaneSpecLineNumbers.bind(this);
    }

    /**
     * Handler listening to Butane Spec modifications
     */
    modifyButaneSpec(e) {
        this.setState({
            butaneSpec: e.target.value,
            ignitionSpec: ""
        });
    }

    /**
     * Handler to update cursors position
     */
    computeCursorPosition(e) {

        const textToCursor = e.target.value.substring(0, e.target.selectionStart)

        // calc line
        const line =  textToCursor.split("\n").length;

        // calc column
        const column = e.target.selectionStart - textToCursor.lastIndexOf("\n");

        this.setState({
            cursorPosition: "Line: " + line + ", Column: " + column,
        });
    }

    /**
     * Handler listening to Butane Spec modifications
     */
    convertButaneSpec() {

        // convert
        fetch("/api/v0/convert", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: this.state.butaneSpec
        })
            .then(response => {
                if (200 === response.status) {
                    return response.text();

                } else if (400 === response.status) {
                    return response.text();

                } else {
                    return null;
                }
            })
            .then(ignitionSpec => {
                this.setState({
                    ignitionSpec: ignitionSpec
                });
            });

    }

    /**
     * Sync scroll
     */
    syncScrollButaneSpecLineNumbers(e) {
        this.refButaneSpecLineNumbers.current.scrollTop = e.target.scrollTop;
    }

    /**
     * Return HTML snippet
     */
    render() {

        // final output
        return (
            <div className="container">
                <div className="row pt-2">
                    <div className="col-12">
                        <p>
                            Butan Converter allows simply to convert a human readable Butane Config into a machine 
                            readable Ignition Config file using a web interface.
                        </p>
                        <p>
                            Butane Converter is an UI extension of the official butane docker image 
                            quay.io/coreos/butane:release. RedHat's original docker image has been taken and being 
                            extend by an GO-based web ui. This means, Butan Converter is always uses the latest 
                            command line tool.
                        </p>
                        <p>
                            You can find the <a href="https://github.com/meixxi/butane-converter#readme">Online Documentation</a> on github.
                        </p>
                    </div>
                </div>

                <div className="row pt-3">
                    <div className="col-12 position-relative">
                        <div ref={this.refButaneSpecLineNumbers} className="position-absolute font-monospace h-100 bg-secondary bg-opacity-25 px-2 text-end" style={{fontSize: '90%', lineHeight: 1.5, paddingTop: '0.375rem', margin: '1px', overflow: 'hidden'}}>
                            {
                                this.state.butaneSpec.split("\n").map((line, idx) => {
                                    return (<div key={'line-' + idx}>{idx + 1}</div>)
                                })
                            }
                        </div>
                        <textarea className="form-control font-monospace ps-5" width="auto" id="txtButaneSpec" value={this.state.butaneSpec} wrap="off" style={{resize: false, fontSize: '90%'}} onBlur={this.convertButaneSpec} onClick={this.computeCursorPosition} onKeyUp={this.computeCursorPosition} onChange={this.modifyButaneSpec} rows="25" autoCorrect="off" autoComplete="off" spellCheck="false" autoCapitalize="off" onScroll={this.syncScrollButaneSpecLineNumbers}></textarea>
                    </div>
                </div>

                <div className="row pt-3">
                    <div className="col-6">
                        <button type="button" className="btn btn-outline-primary" onClick={this.convertButaneSpec}>Convert to Ignition</button>
                    </div>
                    <div className="col-6 text-end">
                        {this.state.cursorPosition}
                    </div>
                </div>

                <div className="row pt-5 pb-5">
                    <div className="col-12">
                        <textarea className="form-control font-monospace" id="txtButaneSpec" value={this.state.ignitionSpec} wrap="off" style={{resize: false, fontSize: '90%'}} rows="25" readOnly></textarea>
                    </div>
                </div>
            </div >

        );
    }

}

export default ButaneConverter;
