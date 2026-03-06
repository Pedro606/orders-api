const express = require("express");

const app = express();

app.use(express.json());

let orders = [];

app.post("/order", (req, res) => {
    orders.push(req.body);
    res.status(201).json({ message: "Pedido criado", order: req.body });
});

app.get("/order/list", (req, res) => {
    res.json(orders);
});

app.get("/order/:id", (req, res) => {
    const order = orders.find(o => o.numeroPedido === req.params.id);

    if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    res.json(order);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

app.put("/order/:id", (req, res) => {

    const index = orders.findIndex(o => o.numeroPedido === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    orders[index] = req.body;

    res.json({
        message: "Pedido atualizado",
        order: orders[index]
    });

});


app.delete("/order/:id", (req, res) => {

    const index = orders.findIndex(o => o.numeroPedido === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Pedido não encontrado" });
    }

    orders.splice(index, 1);

    res.json({
        message: "Pedido deletado"
    });

});