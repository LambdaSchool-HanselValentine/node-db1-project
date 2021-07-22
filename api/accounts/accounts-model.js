const db = require("../../data/db-config");

const getAll = () => {
	// DO YOUR MAGIC
	return db("accounts");
};

const getById = (id) => {
	// DO YOUR MAGIC
	const account = db.first("*").from("accounts").where({ id });
	return account;
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
	console.log(updatedAccount, "updated acc");
	return updatedAccount;
};

const deleteById = async (id) => {
	// DO YOUR MAGIC
	const deleted = await db("accounts").del().where({ id });
	return deleted;
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
