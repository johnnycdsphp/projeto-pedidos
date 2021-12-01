import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

import { Navigate } from "react-router-dom";
import { FaSignOutAlt, FaRegStickyNote, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ItensPedido from "../Components/ItensPedido";
import ListaPedidos from "../Components/ListaPedidos";

import "./Pedidos.css";
import "../Components/Button.css";

const Pedidos = () => {
  const navigate = useNavigate();

  const isLogged = !!localStorage.getItem("app-token");

  //Logout
  const handleLogOut = () => {
    localStorage.setItem("app-token", "");
    localStorage.setItem("app-email", "");
    localStorage.setItem("app-senha", "");
    navigate("/");
  };

  const [orderIsOpen, setIsOrderIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const handleNewOrder = () => {
    setIsVisible(!isVisible);
  };

  const [itensPedido, setItensPedidos] = useState([]);
  const [listaPedidos, setListOrders] = useState([]);

  //Finish
  const handleFinishOrder = () => {
    localStorage.setItem("idPedido", "");
    setIsVisible(!isVisible);
    setIsOrderIsOpen(false);
    listOrders();
  };

  //Deletion
  const handleItemDeletion = (itemID) => {
    toast.dismiss();
    toast.loading("Aguarde... Validando dados do item");

    var data = JSON.stringify({
      id: String(itemID),
    });

    var config = {
      method: "delete",
      url: "https://projeto-pedidos-api.jelastic.saveincloud.net/itensPedido",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("app-token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.dismiss();

        if (response.data.resposta.codigoMensagem === "001") listItens();
        else
          toast.warning(response.data.resposta.mensagem, { autoClose: false });
      })
      .catch(function (error) {
        toast.dismiss();
        toast.warning(
          "Erro não esperado ao excluir o item do pedido, consulte o suporte",
          { autoClose: false }
        );
      });
  };

  //List items
  const listItens = () => {
    toast.dismiss();
    toast.loading("Aguarde... Listando itens do pedido");

    var data = JSON.stringify({
      idPedido: localStorage.getItem("idPedido"),
    });

    var config = {
      method: "post",
      url: "https://projeto-pedidos-api.jelastic.saveincloud.net/itensPedido/lista",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("app-token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.dismiss();
        if (response.data.resposta.codigoMensagem === "001")
          setItensPedidos(response.data.resposta.itensPedido);
        else
          toast.warning(response.data.resposta.mensagem, { autoClose: false });
      })
      .catch(function (error) {
        toast.dismiss();
        toast.warning(
          "Houve um erro não esperado ao listar os itens do pedido, favor consulte o suporte",
          { autoClose: false }
        );
      });
  };

  //List orders
  const listOrders = () => {
    toast.dismiss();
    toast.loading("Aguarde... Listando pedidos");

    var data = JSON.stringify({
      textoPesquisa: "",
    });

    var config = {
      method: "post",
      url: "https://projeto-pedidos-api.jelastic.saveincloud.net/pedidos/lista",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("app-token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.dismiss();
        if (response.data.resposta.codigoMensagem === "001")
          setListOrders(response.data.resposta.pedidos);
        else
          toast.warning(response.data.resposta.mensagem, { autoClose: false });
      })
      .catch(function (error) {
        toast.dismiss();
        toast.warning(
          "Houve um erro ao listar os pedidos, favor consulte o suporte",
          { autoClose: false }
        );
      });
  };

  useEffect(() => {
    listOrders();
  }, []);

  //Add item in order
  const handleAddItem = (valuesItem) => {
    toast.dismiss();
    toast.loading("Aguarde... Validando dados do item");

    var precoUnitario = valuesItem.precoUnitario;
    precoUnitario = precoUnitario.replace(".", ",");
    precoUnitario = precoUnitario.replace(",", ".");

    var data = JSON.stringify({
      idPedido: localStorage.getItem("idPedido"),
      idProduto: String(valuesItem.idProduto),
      quantidade: String(valuesItem.quantidade),
      precoUnitario: String(precoUnitario),
    });

    var config = {
      method: "post",
      url: "https://projeto-pedidos-api.jelastic.saveincloud.net/itensPedido",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("app-token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.dismiss();

        if (response.data.resposta.codigoMensagem === "001") listItens();
        else
          toast.warning(response.data.resposta.mensagem, { autoClose: false });
      })
      .catch(function (error) {
        toast.dismiss();
        toast.warning(
          "Houve um erro ao adicionar o item, favor consulte o suporte",
          { autoClose: false }
        );
      });
  };

  //Order
  const handleSubmitPedido = (values) => {
    toast.dismiss();

    toast.loading("Aguarde... Validando dados do pedido");
    var data = JSON.stringify({
      numeroPedidoCliente: values.numeroPedidoCliente,
      idCliente: values.idCliente,
    });

    var config = {
      method: "post",
      url: "https://projeto-pedidos-api.jelastic.saveincloud.net/pedidos",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("app-token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.dismiss();
        localStorage.setItem("idPedido", response.data.resposta.idPedido);
        listItens();
        setIsOrderIsOpen(true);
      })
      .catch(function (error) {
        toast.dismiss();
        toast.warning("Houve um erro ao iniciar o pedido", {
          autoClose: false,
        });
        setIsOrderIsOpen(false);
      });
  };

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

  return isLogged ? (
    <div className="Pedidos">
      <div className="Pedidos-cabecalho">
        <div className="Pedidos-titulo">
          <h2>Pedidos</h2>
        </div>
        <div className="Pedidos-opcoes">
          <button className="button" onClick={handleLogOut}>
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </div>

      {isVisible ? (
        <div className="Pedidos-novo">
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
                    Adicionar itens
                  </button>
                </div>
              ) : (
                ""
              )}
            </Form>
          </Formik>
        </div>
      ) : (
        <div className="Pedidos-opcoes-pedido">
          <button className="button" onClick={handleNewOrder} type="button">
            <FaRegStickyNote /> Novo Pedido
          </button>
        </div>
      )}

      {orderIsOpen ? (
        <>
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
                  <label>* Preço</label>
                  <Field name="precoUnitario" className="Pedido-Field" />
                </div>

                <div className="Flex2">
                  <label>* Quantidade</label>
                  <Field name="quantidade" className="Pedido-Field" />
                </div>

                <div className="Flex4 Pedidos-opcoes">
                  <button className="button Botao-adicionar-item" type="submit">
                    <FaPlus /> Adicionar item
                  </button>
                </div>
              </div>
            </Form>
          </Formik>

          <div className="Pedidos-intens">
            <ItensPedido
              itensPedido={itensPedido}
              handleItemDeletion={handleItemDeletion}
            />
          </div>

          <div className="Pedidos-opcoes-pedido">
            <button
              className="button Botao-adicionar-item"
              onClick={handleFinishOrder}
              type="button"
            >
              <FaRegStickyNote /> Finalizar Pedido
            </button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="Pedidos-intens">
        <ListaPedidos listaPedidos={listaPedidos} />
      </div>
      <ToastContainer position="top-center" draggable="true" />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Pedidos;
