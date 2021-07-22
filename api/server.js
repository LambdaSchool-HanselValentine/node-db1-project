const express = require("express");

const AccountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
	res.status(200).send(`<h3> API is Live!! </h3>`);
});

module.exports = server;
