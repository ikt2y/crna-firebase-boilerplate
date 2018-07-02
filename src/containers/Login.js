import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitLogin } from '../modules/auth';
import {
  Form,
  Item,
  Input,
  Button,
  Spinner,
  Text,
  Label
} from 'native-base';
import styled from 'styled-components';
import { Layout, ErrorMessage } from '../components';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { submitLogin, isError, errorMessage, isLoad } = this.props;
    const { email, password } = this.state;
    return (
      <Layout>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={(email) => this.setState({ email })}
              value={email}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              onChangeText={(password) => this.setState({ password })}
              value={password}
              secureTextEntry
            />
          </Item>
        </Form>
        { isError &&
          <ErrorMessage text={errorMessage} />
        }
        <StyledButton
          onPress={() => submitLogin({email, password})}
          full
        >
        { isLoad
          ? <Spinner color='white'/>
          : <Text>Login / Sign up</Text>
        }
        </StyledButton>
      </Layout>
    )
  }
}
const StyledButton = styled(Button)`
  margin: 15px 10px;
`

const mapStateToProps = state => {
  return {
    isLoad: state.auth.isLoad,
    isError: state.auth.isError,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, {
  submitLogin
})(Login);