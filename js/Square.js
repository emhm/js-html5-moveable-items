var Square = GameItem.extend({

	//Draw square
	draw: function() {
		var context = this.context;
   		context.fillStyle = this.fill;
   		context.fillRect(this.x, this.y, this.width, this.height);

		return this;
	},
	
});