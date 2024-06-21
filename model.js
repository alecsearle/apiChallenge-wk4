const mongoose = require("mongoose");
mongoose.connect(process.env.DBPASSWORD);
// node --env-file=.env model.js

const CarsSchema = new mongoose.Schema(
	{
		make: {
			type: String,
			required: [true, "Car must have make"],
		},
		model: {
			type: String,
			required: [true, "Car must have model"],
		},
		year: {
			type: Number,
			required: false,
		},
	},
	{ timestamps: true }
);
const Car = mongoose.model("Car", CarsSchema);

module.exports = {
	Car: Car,
};
