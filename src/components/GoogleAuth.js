import React from 'react';

class GoogleAuth extends React.Component {
  state = { isSignedIn: null};

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '950675233779-5fqdpf3368ela4oka78hff45i3mom3gg.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange();
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  renderAuthButton() {
    if(this.state.isSignedIn === null) {
      return null
    } else if(this.state.isSignedIn) {
      return (
        <button
          className='ui red google button'
          onClick={() => this.auth.signOut()}
        >
          <i className='google icon' />
          Sign Out
        </button>
      )
    } else {
      return (
        <button
          className='ui red google button'
          onClick={() => this.auth.signIn()}
        >
          <i className='google icon' />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    )
  }
}

export default GoogleAuth;
