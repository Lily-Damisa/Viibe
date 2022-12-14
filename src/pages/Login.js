import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import TrybeTunes from '../components/TrybeTunes';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      disableBtn: true,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 3;
    const verifyName = value.length < minLength;

    this.setState({
      [name]: value,
      disableBtn: verifyName,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { nameUser } = this.state;

    this.setState({ loading: true });

    const defaultProfileImg = 'https://www.business2community.com/wp-content/plugins/wp-user-avatars/wp-user-avatars/assets/images/mystery.jpg';

    await createUser({
      name: nameUser,
      email: '',
      image: defaultProfileImg,
      description: '',
    });

    const { history } = this.props;

    history.push('/search');
    // this.setState({ loading: false });
  }

  render() {
    const { nameLogin, disableBtn, loading } = this.state;

    return (
      <div className="login-container">
        {
          loading
            ? <Loading size="big" />
            : (
              <div data-testid="page-login" className="login-wrapper">
                <TrybeTunes />
                <form className="login-form">
                  <input
                    data-testid="login-name-input"
                    type="text"
                    className="loginInput"
                    name="nameUser"
                    onChange={ this.handleChange }
                    value={ nameLogin }
                    placeholder="Nome"
                  />
                  <button
                    data-testid="login-submit-button"
                    className="loginBtn"
                    type="submit"
                    disabled={ disableBtn }
                    onClick={ this.handleClick }
                  >
                    Login
                  </button>
                </form>
              </div>)
        }

      </div>
    );
  }
}

Login.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Login;
