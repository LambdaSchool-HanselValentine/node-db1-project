const Accounts = require("./accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
	// DO YOUR MAGIC
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "name and budget are required" });
	} else if (typeof body.name !== "string") {
		res.status(400).json({ message: "name of account must be a string" });
	} else if (body.name.length < 3 || body.name.length > 100) {
		res
			.status(400)
			.json({ message: "name of account must be between 3 and 100" });
	} else if (typeof body.budget !== "number") {
		res.status(400).json({ message: "budget of account must be a number" });
	} else if (body.budget < 0 || body.budget > 1000000) {
		res
			.status(400)
			.json({ message: "budget of account is too large or too small" });
	} else {
		req.body.name = body.name.trim();
		next();
	}
};

exports.checkAccountNameUnique = async (req, res, next) => {
	// DO YOUR MAGIC
	const nameValue = req.body.name;

	Accounts.getByName(nameValue)
		.then((nameReturn) => {
			if (nameReturn) {
				//meaning the name was found in the database
				res.status(404).json({ message: "name already taken" });
			} else {
				next();
			}
		})
		.catch(next);
};

exports.checkAccountId = async (req, res, next) => {
	// DO YOUR MAGIC
	const { id } = req.params;

	// const account = await Accounts.getById(id);
	// if (!account) {
	// 	res.status(404).json({ message: "account not found" });
	// } else {
	// 	req.account = account;
	// 	next();
	// }

	// OR

	Accounts.getById(id)
		.then((account) => {
			if (!account) {
				res.status(404).json({ message: "account not found" });
			} else {
				req.account = account;
				next();
			}
		})
		.catch(next);
};
