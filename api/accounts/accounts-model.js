/* eslint-disable no-unused-vars */
const db = require("../../data/db-config");

const getAll = async () => {
	// DO YOUR MAGIC
	const accounts = await db("accounts");
	return accounts;
};

const getById = (id) => {
	// DO YOUR MAGIC
	const account = db.first("*").from("accounts").where({ id });
	return account;
};

// getbyname for the middleware
const getByName = (name) => {
	return db.first("*").from("accounts").where({ name });
};

const create = async (account) => {
	// DO YOUR MAGIC
	const newAcc = await db("accounts").insert(account);
	return newAcc;
};

const updateById = async (id, account) => {
	// DO YOUR MAGIC
	const updatedAccount = await db
		.update(account)
		.from("accounts")
		.where({ id });
	console.log(updatedAccount, "UPDATED ACCOUNT");
	return updatedAccount;
};

const deleteById = async (id) => {
	// DO YOUR MAGIC
	const toBeDeleted = await getById(id);
	const deleted = await db("accounts").del().where({ id });
	return toBeDeleted;
};

module.exports = {
	getAll,
	getById,
	getByName,
	create,
	updateById,
	deleteById,
};
