"use client"

import Container from 'rsuite/Container';
import Header from 'rsuite/Header';
import Content from 'rsuite/Content';
import Footer from 'rsuite/Footer';
import Form from 'rsuite/Form';
import FormGroup from 'rsuite/FormGroup';
import FormControlLabel from 'rsuite/FormControlLabel';
import FormControl from 'rsuite/FormControl';
import ButtonToolbar from 'rsuite/ButtonToolbar';
import Button from 'rsuite/Button';
import Navbar from 'rsuite/Navbar';
import NavbarBrand from 'rsuite/NavbarBrand';
import Panel from 'rsuite/Panel';
import FlexboxGrid from 'rsuite/FlexboxGrid';
import FlexboxGridItem from 'rsuite/FlexboxGridItem';
import { useRef, useState } from 'react';
import { Text } from 'rsuite';

const initForm = {
  email: '',
  password: '',
};

export default function () {
  const formRef = useRef(null);
  const [formValue, setFormValue] = useState( initForm );

  const handleSubmitLogin = () => {
    console.log(formValue);
  };


  return(
  <div className="login-page">
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <NavbarBrand>
            <p style={{ color: '#fff' }}>MyPet</p>
          </NavbarBrand>
        </Navbar>
      </Header>
      <Content style={{ marginTop: "20px" }}>
        <FlexboxGrid justify="center">
          <FlexboxGridItem colspan={12}>
            <Panel header='Login' bordered>
              <Form
                fluid
                ref={formRef}
                onChange={setFormValue}
                formValue={formValue}
              >
                <FormGroup>
                  <FormControlLabel>Correo electronico</FormControlLabel>
                  <FormControl name="email" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel>Contraseña</FormControlLabel>
                  <FormControl name="password" type="password" autoComplete="off" />
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button 
                      appearance="primary"
                      onClick={handleSubmitLogin}
                    >
                      Ingresar
                    </Button>
                    <Button 
                      appearance="link"
                    >
                      ¿Olvidaste la constraseña?
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGridItem>
        </FlexboxGrid>
      </Content>
      <Footer 
        className='d-flex justify-content-center mt-3'
      >
        ¿No tienes una cuenta? 
        <a 
          href="/auth/new-account"
        >
          <Text  
            color="green" 
            weight="semibold"
            className='ms-2'
          >
            Registrate
          </Text>
        </a>
      </Footer>
    </Container>
  </div>)
}
