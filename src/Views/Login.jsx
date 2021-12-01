import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    toast.loading("Aguarde... Validando dados do usuário");
    var data = JSON.stringify({
      email: values.email,
      senha: values.senha,
    });

    var config = {
      method: "post",
      url: "https://projeto-pedidos-api.jelastic.saveincloud.net/usuarios/autenticaUsuario",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("app-token", response.data.resposta.token);
        localStorage.setItem("app-email", response.data.resposta.email);
        localStorage.setItem("app-senha", response.data.resposta.senha);
        toast.dismiss();
        toast.success("Usuário autenticado com sucesso", { autoClose: false });
        navigate("/pedidos");
      })
      .catch(function (error) {
        toast.dismiss();
        toast.warning("Usuário não encontrado para os dados informados", {
          autoClose: false,
        });
      });
  };

  const validations = yup.object().shape({
    email: yup
      .string()
      .email("Este não é um formato válido de email")
      .required("O campo email é de preenchimento obrigatório"),
    senha: yup
      .string()
      .min(8, "Mínimo de 8 caracteres para o campo senha")
      .required("O campo senha é de preenchimento obrigatório"),
  });

  return (
    <>
      <div className="Login">
        <h2>Autenticação</h2>
        <p>Informe seu email e senha para autenticação</p>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validations}
          initialValues={{
            email: "",
            senha: "",
          }}
        >
          <Form className="Login">
            <div className="Login-Group">
              <Field name="email" className="Login-Field" />
              <ErrorMessage
                component="span"
                name="email"
                className="Login-Error"
              />
            </div>
            <div className="Login-Group">
              <Field type="password" name="senha" className="Login-Field" />
              <ErrorMessage
                component="span"
                name="senha"
                className="Login-Error"
              />
            </div>
            <button className="Login-Btn" type="submit">
              Validar meus dados
            </button>
          </Form>
        </Formik>
        <ToastContainer position="top-center" draggable="true" />
      </div>
    </>
  );
};

export default Login;
