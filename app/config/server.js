import express from "express";
import router from "../routes/index.js";
const app = express();

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(router);

app.get("/syncpro/", (req, res) => {
	res.status(200).json({
		status: 200,
		msg: "Bienvenido al servidor de SyncPro.",
	});
});

export default app;
