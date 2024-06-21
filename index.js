// node --env-file=.env index.js
const cors = require("cors");
const express = require("express");
const app = express();
const model = require("./model");
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/cars", async (req, res) => {
	try {
		let cars = await model.Car.find();
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(cars);
	} catch (error) {
		console.log(error);
		res.status(400).send("Get Error");
	}
});

app.post("/cars", async (req, res) => {
	const data = req.body;
	try {
		let newCar = new model.Car({
			make: data.make,
			model: data.model,
			year: data.year,
		});
		let error = newCar.validateSync();
		if (error) {
			res.status(400).json(error);
			return;
		}
		await newCar.save();
		res.status(201).json(newCar);
	} catch (error) {
		res.status(400).send("Post Error");
	}
});

app.delete("/cars/:id", async (req, res) => {
	try {
		console.log("Delete single car");
		console.log(req.params.id);
		let isDeleted = await model.Car.findOneAndDelete({
			_id: req.params.id,
		});
		if (!isDeleted) {
			res.status(404).send("Could not find car");
			return;
		}
		res.status(200).send("car deleted");
	} catch (error) {
		res.status(400).send("Delete Error");
	}
});

app.get("/cars/:id", async (req, res) => {
	try {
		console.log("Get single car");
		console.log(req.params.id);
		let isFound = await model.Car.findOne({
			_id: req.params.id,
		});
		if (!isFound) {
			res.status(404).send("Could not GET car");
			return;
		}
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(isFound);
	} catch (error) {
		res.status(400).send("GET ID Error");
	}
});

app.put("/cars/:id", async (req, res) => {
	try {
		const updatedCar = {
			make: req.body.make,
			model: req.body.model,
			year: req.body.year,
		};
		let putCar = await model.Car.findByIdAndUpdate(
			{ _id: req.params.id },
			updatedCar,
			{ new: true }
		);
		if (!putCar) {
			res.status(404).send("Could not update car");
			return;
		}
		res.status(204).json(putCar);
	} catch (error) {
		res.status(400).send("Put Error");
	}
});

app.listen(8080, () => {
	console.log("Server is running on http://localhost:8080");
});
