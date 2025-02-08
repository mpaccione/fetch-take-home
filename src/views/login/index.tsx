import { useState } from "react";
import { Button, Input, Form, FormField, Segment } from "semantic-ui-react";
import styled from "styled-components";

import { postLogin } from "./actions";
import { useNavigate } from "react-router";
// @ts-ignore
import Dog from "../../assets/dog.svg?react";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;

  .segment {
    align-items: center;
    justify-content: center;
    display: flex;
    width: 300px;
  }

  button {
    width: 100%;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const submitLogin = async () => {
    const res = await postLogin({ email, name });

    if (res && res?.status === 200) {
        return navigate('/dogs')
    } else {
        alert(`Login Failure: ${res}`)
    }
  };

  return (
    <LoginContainer>
      <Dog />
      <Segment>
        <Form>
          <h3>Login</h3>
          <FormField>
            <Input
              onChange={(e) => setName(e.target.value)} placeholder="Name"
              type="name"
            />
          </FormField>  
          <FormField>
            <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
          </FormField>
          <Button onClick={() => submitLogin()}>Login</Button>
        </Form>
      </Segment>
    </LoginContainer>
  );
};

export default Login;
