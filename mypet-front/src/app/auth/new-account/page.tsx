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
import { forwardRef, useRef, useState } from 'react';
import { Schema, Text } from 'rsuite';

const initForm = {
  name: '',
  password: '',
};

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  fullname: StringType().isRequired(),
  name: StringType().isRequired(),
  email: StringType().isEmail().isRequired(),
  age: NumberType().range(18, 30).isRequired(),
  password: StringType().isRequired().proxy(['confirmPassword']),
  confirmPassword: StringType().equalTo('password')
});

const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <FormGroup ref={ref}>
      <FormControlLabel>{label} </FormControlLabel>
      <FormControl name={name} accepter={accepter} {...rest} />
    </FormGroup>
  );
});

export default function () {
  const formRef = useRef(null);
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    fullname: '',
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    console.log(formValue, 'Form Value');
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
            <Panel header='Crear una nueva cuenta' bordered>
              <Form
                fluid
                ref={formRef}
                onChange={setFormValue}
                formValue={formValue}
                model={model}
              >
                <TextField name="fullname" label="Nombre completo" />
                <TextField name="name" label="Nombre de usuario" />
                <TextField name="email" label="Correo electrónico" />
                <TextField name="age" label="Edad" />
                <TextField name="password" label="Contraseña" type="password" autoComplete="off" />
                <TextField
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  autoComplete="off"
                />
                <FormGroup>
                  <ButtonToolbar>
                    <Button 
                      appearance="primary"
                      onClick={handleSubmit}
                    >
                      Registrarse
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
            </Panel>
          </FlexboxGridItem>
        </FlexboxGrid>
      </Content>
      <Footer 
        className='d-flex justify-content-center mt-3 mb-3'
      >
        ¿Ya tienes una cuenta? 
        <a 
          href="/auth/login"
        >
          <Text  
            color="green" 
            weight="semibold"
            className='ms-2'
          >
            Iniciar sesión
          </Text>
        </a>
      </Footer>
    </Container>
  </div>)
}