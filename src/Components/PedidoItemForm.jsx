import React from "react"
import {  Formik, Form, Field } from "formik"
import { FaPlus } from "react-icons/fa"


const PedidoItemForm = ({ handleAddItem }) => {

  return (
    <Formik
            onSubmit={handleAddItem}
            initialValues={{
              idProduto: 1,
              quantidade: 0,
              precoUnitario: 0,
            }}
          >
            <Form className="Pedido-Form">
              <div className="Pedidos-linhas">
                <div className="Flex1">
                  <hr />
                </div>
              </div>

              <div className="Pedidos-linhas">
                <div className="Flex1">
                  <label>* Selecione um produto</label>
                  <Field
                    className="Pedido-Field Select"
                    component="select"
                    name="idProduto"
                  >
                    <option className="options" value="0"></option>
                    <option className="options" value="1">
                      Millenium​ ​Falcon
                    </option>
                    <option className="options" value="2">
                      X-Wing
                    </option>
                    <option className="options" value="3">
                      Super Star Destroyer
                    </option>
                    <option className="options" value="4">
                      TIE Fighter
                    </option>
                    <option className="options" value="5">
                      Lightsaber
                    </option>
                    <option className="options" value="6">
                      DLT-19 Heavy Blaster Rifle
                    </option>
                    <option className="options" value="7">
                      Lightsaber
                    </option>
                  </Field>
                </div>
              </div>

              <div className="Pedidos-linhas">

                <div className="Flex2 NoLeft">
                  <label>* Quantidade</label>
                  <Field name="quantidade" className="Pedido-Field" />
                </div>
                
                <div className="Flex2">
                  <label>* Preço</label>
                  <Field name="precoUnitario" className="Pedido-Field" />
                </div>

                <div className="Flex4 Pedidos-opcoes">
                  <button className="button Botao-adicionar-item" type="submit">
                    <FaPlus /> Adicionar item
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
  )

};

export default PedidoItemForm;
