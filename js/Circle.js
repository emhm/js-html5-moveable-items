var Circle = GameItem.extend({
	//Draw circle
	draw: function() {
		var context = this.context;

		context.beginPath();
		context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI, false);
		context.fillStyle = this.fill;
		context.fill();

		return this;
	},

	//Returns back the item offsets
	offset: function() {
		return { x: this.width / 2, y: this.height / 2 };
	},

});