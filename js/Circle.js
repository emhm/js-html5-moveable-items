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

	// Compares x, y with objects bounds
	//
	// Since the circle is drawn from the center
	// there is slightly different compare method
	//
	// TODO: This isn't perfect, needs to check actual bounds
	//		 and not just a square box
	inBounds: function(mx, my) {
		var topX = (this.x - this.width / 2),
			topY = (this.y - this.width / 2);

		return  (topX <= mx) && (topX + this.width >= mx) && 
				(topY <= my) && (topY + this.width >= my);
	},

});