import React from "react"
import { ErrorMessage, Formik, Form, Field } from "formik"
import { FaArrowDown } from "react-icons/fa"
import * as yup from "yup"

const PedidoForm = ({ handleSubmitPedido, orderIsOpen }) => {
  const validationsPedido = yup.object().shape({
    numeroPedidoCliente: yup
      .number("Somente números")
      .required(
        "O campo de numero do pedido do cliente é de preenchimento obrigatório"
      ),
    idCliente: yup
      .string()
      .required("O campo cliente é de preenchimento obrigatório"),
  });

  return (
    <>
      <Formik
        onSubmit={handleSubmitPedido}
        validationSchema={validationsPedido}
        initialValues={{
          idCliente: "",
          numeroPedidoCliente: "",
        }}
        setValuesOrders
      >
        <Form className="Pedido-Form">
          <div className="Pedidos-linhas">
            <div className="Flex1">
              <label>* Nº Pedido cliente</label>
              <Field name="numeroPedidoCliente" className="Pedido-Field" />
              <ErrorMessage
                component="span"
                name="numeroPedidoCliente"
                className="Login-Error"
              />
            </div>

            <div className="Flex4">
              <label>* Selecione um cliente</label>
              <Field
                className="Pedido-Field Select"
                component="select"
                name="idCliente"
              >
                <option className="options" value="0"></option>
                <option className="options" value="1">
                  Darth​ ​Vader
                </option>
                <option className="options" value="2">
                  Obi-Wan​ ​Kenobi
                </option>
                <option className="options" value="3">
                  Luke​ ​Skywalker
                </option>
                <option className="options" value="4">
                  Imperador​ ​Palpatine
                </option>
                <option className="options" value="5">
                  Han​ ​Solo
                </option>
              </Field>
            </div>
          </div>

          {orderIsOpen === false ? (
            <div className="Pedidos-opcoes">
              <button className="Pedido-Btn" type="submit">
                <FaArrowDown /> Adicionar itens
              </button>
            </div>
          ) : (
            ""
          )}
        </Form>
      </Formik>
    </>
  );
};

export default PedidoForm;
