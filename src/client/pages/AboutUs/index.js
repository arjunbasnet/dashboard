import React from 'react';

class AboutUs extends React.Component {

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="header"><h1>About</h1></div>
                    <div className="card">
                        <div className="content">
                            <div className="row">
                                <p>The Dashboard of Life is a service to provide important, customized pieces of
                                    information in a single Web page.
                                    Say goodbye to clicking through different information sources, and say hello to
                                    keeping focused.
                                    There is no bluff, no ads, no distractions, just the information you need!</p>
                                <p>With version 1.0 of the Service, you can:
                                    <ul>
                                        <li>Move widgets around</li>
                                        <li>Interact with most of the widgets</li>
                                        <li>Store information locally</li>
                                    </ul>
                                </p>
                                <p>
                                    You can not (yet):
                                    <ul>
                                        <li>Add or delete widgets</li>
                                        <li>Log in</li>
                                    </ul>
                                </p>
                                <p> Thanks for trying our service!</p>

                                <p>Arjun, Mihai, and Ohto</p>

                                <p>Please give us feedback with the following form of bugs and improvements for the
                                    service:</p>
                                <div className="col-md-6 col-md-offset-3" >
                                    <div className="card">
                                        <div className="content">
                                            <form className="form-horizontal" action="mailto:ohtopen@gmail.com" method="POST">
                                                <div className="form-group"><label
                                                    className="col-md-3 control-label">Name</label>
                                                    <div className="col-md-9">
                                                        <div>
                                                            <div><input type="text" name="name"
                                                                        className="form-control error"/></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group"><label
                                                    className="col-md-3 control-label">Email</label>
                                                    <div className="col-md-9">
                                                        <div>
                                                            <div><input type="email" name="email"
                                                                        className="form-control error"/></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group"><label
                                                    className="col-md-3 control-label">Message</label>
                                                    <div className="col-md-9">
                                                        <div>
                                                            <textarea name="message" className="form-control error"></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group"><label className="col-md-3"></label>
                                                    <div className="col-md-9">
                                                        <button type="submit" className="btn btn-fill btn-info">Send
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default AboutUs;