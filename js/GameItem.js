var GameItem = BaseClass.extend({
	x: 0, 
	y: 0,
	width: 0,
	height: 0,
	fill: undefined,
	dragging: false,
	canvas: undefined,
	context: undefined,

	//Init
	init: function(x, y, width, height, fill) {
		this.x = x;
		this.y = y;
		this.width = width || 100;
		this.height = height || 100;
		this.fill = fill || 'red';

		return this;
	},

	//Draw object on canvas
	draw: function() {
		return this;
	},

	//Move the object by passing in a new location.
	move: function(x, y) {
		this.x = x;
		this.y = y;

		return this;
	},

	//Returns back the item offsets
	offset: function() {
		return { x: 0, y: 0 };
	},

	//Compares x, y with objects bounds
	inBounds: function(mx, my) {
		var topX = (this.x - this.offset().x),
			topY = (this.y - this.offset().y);

		return  (topX <= mx) && (topX + this.width >= mx) && 
				(topY <= my) && (topY + this.width >= my);
	},

	//onMouseDown internal handler
	onMouseDown: function() {
		
	},
});