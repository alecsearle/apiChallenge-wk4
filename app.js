Vue.createApp({
	data() {
		return {
			newCar: {
				make: "hi",
				model: "",
				year: "",
			},
		};
	},
	methods: {
		addCar: function () {},
		deleteCar: function () {},
		updateCar: function () {},
	},
	created: function () {
		console.log("vue app loaded");
	},
}).mount("#app");
