'use client'

import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function ForgetPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const forgetPassword = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'forget-password',
      formData,
    })
    finishLoading()
  }

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <Form
          title='Recuperar contraseña'
          onSubmit={forgetPassword}
          description='Formulario para recueperar tu contraseña'
        >
          <div className='my-[10px] flex flex-col gap-4'>
            <Form.Input
              label='Correo'
              name='email'
              placeholder='Ingresa tu correo...'
            />
          </div>
          <Form.SubmitButton buttonText="Recuperar contraseña" isLoading={isLoading} />
          <Form.Footer 
            description='Volver a inicio'
            textLink='Inica Sesión'
            link='/'
          />
        </Form>
      </div>
    </>
  );
}