"use client"

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Modal, Form, Button, IconButton, Schema, Grid, Col, Row, Uploader } from 'rsuite';
import ImageIcon from '@rsuite/icons/Image';

interface CrearActualizarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired(),
  price: NumberType().isRequired(),
});

const TextField = forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const CrearActualizar: React.FC<CrearActualizarProps> = ({ open, setOpen }) => {
    const [showModal, setShowModal] = useState(open);
    const formRef = useRef(null);
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        name: '',
        price: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        }
    };
    
    useEffect(() => {
      setShowModal(open);
    }, [open]);
  
    const close = () => {
      setShowModal(false);
      setOpen(false);
    };
  
    const handleSubmit = () => {
        if (!formRef.current.check()) {
            // console.error('Form Error');
            return;
        }
        console.log(formValue, 'Form Value');
      };
  
    return (
      <Modal size="md" open={showModal} onClose={close}>
        <Modal.Header>
          <Modal.Title>Crear/Actualizar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
            fluid 
            ref={formRef}
            onChange={setFormValue}
            formValue={formValue}
            model={model}
            className='mx-3'
        >
            <Grid fluid>
                <Row>
                    <Col sm={24} md={8}>
                        <TextField name="name" label="Nombre" />
                        <TextField name="price" label="PVP" />
                    </Col>
                    <Col>
                    <div className="d-flex flex-column">
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <div>
                            {previewUrl ? (
                            <img src={previewUrl} alt="Preview" style={{ maxWidth: '100px', maxHeight: "100px" }} />
                            ) : (
                            <p>Mostrar imagen</p>
                            )}
                        </div>
                        {imageFile && <p>{imageFile.name}</p>}
                    </div>
                    </Col>
                </Row>
            </Grid>
            {/* <TextField name="email" label="Correo electrónico" /> */}
            {/* <Form.Group>
              <Form.ControlLabel>Nombre del producto</Form.ControlLabel>
              <Form.Control name="nombre" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Descripción</Form.ControlLabel>
              <Form.Control name="descripcion" componentClass="textarea" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Imagen</Form.ControlLabel>
              <Form.Control name="imagen" type="file" accept="image/*"/>
            </Form.Group> */}
            <Form.Group className='d-flex justify-content-end'>
                <Button appearance="primary" onClick={handleSubmit}>
                    Guardar
                </Button>
            
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  
  export default CrearActualizar;