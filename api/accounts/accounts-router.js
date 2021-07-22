const router = require("express").Router();
const Accounts = require("./accounts-model");
const Middleware = require("./accounts-middleware");

router.get("/", (req, res, next) => {
	Accounts.getAll()
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch(next);
});

router.get("/:id", Middleware.checkAccountId, (req, res, next) => {
	if (!req.account) {
		next();
	} else {
		res.status(200).json(req.account);
	}
});

router.post("/", Middleware.checkAccountPayload, (req, res, next) => {
	const body = req.body;

	Accounts.create(body)
		.then((newAccId) => {
			res.status(201).json(newAccId);
		})
		.catch(next);
});

router.put(
	"/:id",
	Middleware.checkAccountPayload,
	Middleware.checkAccountId,
	(req, res, next) => {
		const { id } = req.params;
		const body = req.body;
		Accounts.updateById(id, body)
			.then((updated) => {
				res.status(200).json(updated);
			})
			.catch(next);
	},
);

router.delete("/:id", Middleware.checkAccountId, (req, res, next) => {
	const { id } = req.params;
	if (!req.account) {
		next();
	} else {
		Accounts.deleteById(id)
			.then(() => {
				res.status(200).json({
					message: `Account successfully deleted`,
				});
			})
			.catch(next);
	}
});

router.use((err, req, res, next) => {
	// eslint-disable-line
	const message = err?.message || "Something went wrong in the Accounts router";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = router;
