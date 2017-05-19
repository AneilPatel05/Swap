import React from 'react';
import { withRouter } from 'react-router';
declare var $;

class NavBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalHeader: "Log in with Facebook",
      userFB: null,
      accessToken: null,
      status
    };

    this.sendEmail = this.sendEmail.bind(this);
    this.chooseModal = this.chooseModal.bind(this);
    this.checkVerified = this.checkVerified.bind(this);
    this.initializeNavbarFade = this.initializeNavbarFade.bind(this);
  }

  public componentDidMount() {
    this.initializeNavbarFade();

    let userFB = this.props.userFB;
    let accessToken = this.props.accessToken;
    let status = this.props.status;

    this.setState({
      userFB,
      accessToken,
      status
    });
  }

  public initializeNavbarFade() {
    $(window).scroll(function(){
      if ($(this).scrollTop() > 300) {
        $('#menu').fadeIn(500);
      } else {
        $('#menu').fadeOut(500);
      }
    });
  }

  public componentWillReceiveProps(newProps: any) {
    if (this.state.userFB !== newProps.userFB) {
      this.setState({
        userFB: newProps.userFB,
        status: newProps.status
      });
    }
  }

  public sendEmail(e: any) {
    e.preventDefault();

    let accessToken;
    let that = this;
    const edu_email = ($('input.form-control')[0] as HTMLInputElement).value
    FB.getLoginStatus(function(response) {
      accessToken = response.authResponse.accessToken
      $.ajax({
        method: "PATCH",
        url: `api/users/${accessToken}`,
        data: { edu_email }
      }).then(obj => {
        $('#logInModal').modal('hide');
        $('#emailInputModal').modal('hide');
        $('#emailVerificationModal').modal('show');
      })
    })
  }

  public resendVerificationEmail() {
    $('#logInModal').modal('hide')
    $('#emailInputModal').modal('show')
    $('#emailVerificationModal').modal('hide')
  }

  public chooseModal() {
    const that = this;
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        that.setState({modalHeader: "Log out with Facebook"})
        const accessToken = response.authResponse.accessToken
        $.ajax({
          method: "GET",
          url: `api/users/${accessToken}`
        }).then(obj => {
          if (obj.edu_email_confirmed) {
            $('#logInModal').modal('show');
          } else if (obj.edu_email === null) {
            $('#emailInputModal').modal('show');
          } else {
            $('#emailVerificationModal').modal('show');
          }
        }).fail(() => FB.logout(res => console.log(res)))
      } else {
        that.setState({modalHeader: "Log in with Facebook"})
        $('#logInModal').modal('show');
      }
    });
  }

  public checkVerified(e: any) {
    let address = e.currentTarget.id;
    const accessToken = (FB as any).getAccessToken();
    $.ajax({
      method: "GET",
      url: `api/users/${accessToken}`
    }).then(obj => {
      if (obj.edu_email_confirmed) {
        this.props.router.push(address);
      } else if (obj.edu_email === null) {
        $('#emailInputModal').modal('show');
      } else {
        $('#emailVerificationModal').modal('show');
      }
    }).fail(() => FB.logout(res => console.log(res)))
  }

  public checkUserStatus() {
    if (this.state.userFB) {
      return (
        <div className="navbar-collapse collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/#/recent">Browse</a></li>
            <li><a id="dashboard/posts" onClick={(e) => this.checkVerified(e)}>Dashboard</a></li>
            <li><a onClick={this.chooseModal}>{this.state.userFB.name}</a></li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="navbar-collapse collapse" id="navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/#/recent">Browse</a></li>
            <li><a onClick={this.chooseModal}>Sign Up</a></li>
            <li><a onClick={this.chooseModal}>Log In</a></li>
          </ul>
        </div>
      );
    }
  }

  public render() {
    return (
      <div>
        <nav id="menu" className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed p-x-0" data-toggle="collapse" data-target="#navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <span>Swap</span>
              </a>
            </div>
            {this.checkUserStatus()}
          </div>
        </nav>
        <nav className="navbar navbar-default navbar-static-top navbar-padded text-uppercase app-navbar">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed p-x-0" data-toggle="collapse" data-target="#navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <span>Swap</span>
              </a>
            </div>
            {this.checkUserStatus()}
          </div>
        </nav>

        <a id="logInModalTrigger" className="hidden" data-toggle="modal" data-target="#logInModal">Login Modal Trigger</a>
        <div className="modal fade" id="logInModal" tabIndex={-1} role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <h3 className="modal-title" id="authModalLabel">{this.state.modalHeader}</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <div className="fb-login-button" data-scope="email" data-max-rows="1" data-size="large" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="true" data-onlogin=""></div>
                <div className="modal-body text-center">
                  By signing up, I agree to Swap's <a href="/#/terms" target="_blank" id="legal-links">Terms of Service</a>, <a href="/#/terms" target="_blank" id="legal-links">Nondiscrimination Policy</a>, <a href="/#/terms" target="_blank" id="legal-links">Payments Terms of Service</a>, and <a href="/#/terms" target="_blank" id="legal-links">Privacy Policy</a>.
                </div>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

        <a id="emailInputModalTrigger" className="hidden" data-toggle="modal" data-target="#emailInputModal">Email Input Modal Trigger</a>
        <div className="modal fade" id="emailInputModal" tabIndex={-1} role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <h3 className="modal-title" id="authModalLabel">Enter your email address</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <form onSubmit={ this.sendEmail }>
                  <div className="form-group input-group">
                    <input type="text" className="form-control" placeholder="Your email" aria-describedby="basic-addon2"/>
                    <span className="input-group-addon" id="basic-addon2">Ex: me@email.com</span>
                  </div>
                  <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ this.sendEmail }>Submit</button>
                </form>
              </div>
              <br/>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

        <a id="emailVerificationModalTrigger" className="hidden" data-toggle="modal" data-target="#emailVerificationModal">Email Verification Modal Trigger</a>
        <div className="modal fade" id="emailVerificationModal" tabIndex={-1} role="dialog"
             aria-labelledby="authModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="auth-modal-header">
                <h3 className="modal-title" id="authModalLabel">Thank you!</h3>
              </div>
              <div className="modal-body text-center" id="fb-modal-body">
                <h4>Please check your email for the verification link</h4>
                <br/>
                <button type="button" className="btn btn-warning btn-lg btn-block" onClick={ this.resendVerificationEmail }>Re-send verification email</button>
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={ () => $('#emailVerificationModal').modal('hide') }>Close</button>
              </div>
              <br/>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
