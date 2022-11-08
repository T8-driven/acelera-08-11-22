import express from "express";

const app = express();
app.use(express.json());

const extratos = [
  {
    cliente: "Fulano",
    movimentacao: 300.0,
    data: "13/01/2022",
    tipo: "entrada",
  },
  {
    cliente: "Ciclana",
    movimentacao: 210.3,
    data: "14/01/2022",
    tipo: "entrada",
  },
  {
    cliente: "Ciclana",
    movimentacao: 500.0,
    data: "14/01/2022",
    tipo: "saida",
  },
  {
    cliente: "Fulano",
    movimentacao: 704.3,
    data: "20/01/2022",
    tipo: "entrada",
  },
  {
    cliente: "Ciclana",
    movimentacao: 600.0,
    data: "30/01/2022",
    tipo: "entrada",
  },
  {
    cliente: "Beltrano",
    movimentacao: 200.5,
    data: "02/02/2022",
    tipo: "saida",
  },
  { cliente: "Fulano", movimentacao: 42.8, data: "02/02/2022", tipo: "saida" },
  {
    cliente: "Beltrano",
    movimentacao: 100.0,
    data: "04/02/2022",
    tipo: "entrada",
  },
  { cliente: "Fulano", movimentacao: 20.1, data: "11/02/2022", tipo: "saida" },
  {
    cliente: "Fulano",
    movimentacao: 300.0,
    data: "13/02/2022",
    tipo: "entrada",
  },
  { cliente: "Fulano", movimentacao: 30.3, data: "21/02/2022", tipo: "saida" },
  {
    cliente: "Beltrano",
    movimentacao: 300.2,
    data: "25/02/2022",
    tipo: "entrada",
  },
  {
    cliente: "Ciclana",
    movimentacao: 100.6,
    data: "30/02/2022",
    tipo: "entrada",
  },
  { cliente: "Ciclana", movimentacao: 41.0, data: "03/03/2022", tipo: "saida" },
  { cliente: "Ciclana", movimentacao: 23.0, data: "08/03/2022", tipo: "saida" },
  {
    cliente: "Fulano",
    movimentacao: 300.0,
    data: "13/03/2022",
    tipo: "entrada",
  },
  {
    cliente: "Beltrano",
    movimentacao: 10.1,
    data: "15/03/2022",
    tipo: "saida",
  },
  { cliente: "Fulano", movimentacao: 30.9, data: "20/03/2022", tipo: "saida" },
];

app.get("/extrato", (req, res) => {
  const { cliente } = req.headers;
  const { dia, mes, tipo } = req.query;

  if (!cliente) {
    res.status(400).send({ message: "Envie o cliente" });
    return;
  }

  const extratosDoCliente = extratos.filter(
    (extrato) => extrato.cliente === cliente
  );

  if (extratosDoCliente.length === 0) {
    res.sendStatus(404);
    return;
  }

  const extratoFiltrado = extratosDoCliente
    .filter((extrato) => (!dia ? true : extrato.data.split("/")[0] === dia))
    .filter((extrato) => (!mes ? true : extrato.data.split("/")[1] === mes))
    .filter((extrato) => (!tipo ? true : extrato.tipo === tipo));

  res.send(extratoFiltrado);
});

app.post("/extrato", (req, res) => {
  const { movimentacao, data, tipo } = req.body;
  const { cliente } = req.headers;

  if (!movimentacao || !data || !tipo || !cliente) {
    res.sendStatus(400);
    return;
  }

  extratos.push({ cliente, movimentacao, data, tipo });

  res.sendStatus(201);
});

app.listen(5000, () => console.log("Server running in port: 5000"));

/* 
Envio de dados na req (front)


Get com headers
axios.get("url", {
    headers: {
        Authorization: "Bearer TOKEN"
    }
})

Post com body e headers
axios.post("url", body, {
    headers: {
        cliente: "Fulano"
    }
}) 

Query Params:
axios.get("url/extrato?dia=30", {
    headers: {
        Authorization: "Bearer TOKEN"
    }
})
*/
