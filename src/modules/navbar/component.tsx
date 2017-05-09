import React from 'react';

class NavBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed p-x-0" data-toggle="collapse" data-target="#navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="../">
                <span>Swap</span>
              </a>
            </div>
            <div className="navbar-collapse collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li >
                  <a href="#">Browse</a>
                </li>
                <li className="active">
                  <a href="#">Who are we?</a>
                </li>
                <li >
                  <a data-toggle="modal" data-target="#authModal">Sign Up</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="modal fade" id="authModal" tabIndex="-1" role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <h3 className="modal-title" id="authModalLabel">Sign up with Facebook</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <div className="fb-login-button" data-scope="email" data-max-rows="1" data-size="large" data-button-type="continue_with" data-auto-logout-link="true" data-use-continue-as="true" data-onlogin="checkLoginState();"></div>

                <div className="modal-body text-center">
                  By signing up, I agree to Swap's <a id="legal-links">Terms of Service</a>, <a id="legal-links">Nondiscrimination Policy</a>, <a id="legal-links">Payments Terms of Service</a>, and <a id="legal-links">Privacy Policy</a>.
                </div>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;