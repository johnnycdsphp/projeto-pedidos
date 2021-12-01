import React, { useState, useEffect } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import ItensPedido from "../Components/ItensPedido"
import ListaPedidos from "../Components/ListaPedidos"

import "./Pedidos.css"
import "../Components/Button.css"
import PedidoForm from "../Components/PedidoForm"
import PedidoItemForm from "../Components/PedidoItemForm"
import BotaoIniciar from "../Components/BotaoIniciar"
import BotaoFinalizar from "../Components/BotaoFinalizar"
import PedidoCabecalho from "../Components/PedidoCabecalho"

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

  return isLogged ? (

    <div className="Pedidos">
      	<PedidoCabecalho handleLogOut={handleLogOut} />
		<div className="Pedidos-novo">
			{ isVisible ? ( <PedidoForm handleSubmitPedido={handleSubmitPedido} orderIsOpen={orderIsOpen} /> ) : ( <BotaoIniciar handleNewOrder={handleNewOrder} /> )}
			{orderIsOpen ? (
				<>
					<PedidoItemForm handleAddItem={handleAddItem} />
					<ItensPedido
							itensPedido={itensPedido}
							handleItemDeletion={handleItemDeletion}
					/>
					<BotaoFinalizar handleFinishOrder={handleFinishOrder} />
				</>
			) : ('')}
		</div>

		<ListaPedidos listaPedidos={listaPedidos} />
		<ToastContainer position="top-center" draggable="true" />

    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Pedidos;
