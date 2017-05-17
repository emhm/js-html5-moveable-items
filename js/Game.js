var Game = {
	width: 0,
	height: 0,
	cacheMouseX: 0,
	cacheMouseY: 0,
	self: undefined,
	canvas: undefined,
	context: undefined,
	itemSelected: undefined,
	dragging: false,
	redraw: false,
	running: false,
	gameItems: [],

	//Init the game
	init: function(canvas, context) {
		if(this.running) {
			return this;
		}

		var self = this;

		//TODO: This will cause issues if #board isn't found
		this.canvas = canvas || $('#board');
		this.context = context || this.canvas[0].getContext('2d');
		this.width = this.canvas.width();
		this.height = this.canvas.height();
		this.self = self;

		//TODO: account for resizing the page
		//The canvas needs to have a fixed height and width to
		//prevent drawn objects from being blurry
		this.context.canvas.width = this.canvas.width();
		this.context.canvas.height = this.canvas.height();

		//Setup game mouse handlers
		this.canvas.on('mousedown', function(e) { self.onMouseDown(e); });
		this.canvas.on('mouseup', 	function(e) { self.onMouseUp(e);   });
		this.canvas.on('mousemove', function(e) { self.onMouseMove(e); });
		this.canvas.on('mouseleave',function(e) { self.onMouseLeave(e);});

		//Setup navigation click handler
		$('#sidebar li').on('click', function(sender) { self.onAddShapeClick(this); });

		//Setup tick handler
		setInterval(function() { self.draw(); }, 20);
		this.running = true;

		return this;
	},

	//Adds a new item to the board
	addItem: function(item) {
		// TODO:
		// Verify the object being passed is 
		// derived from BaseClass
		
		//Set parent values
		item.canvas = this.canvas;
		item.context = this.context;

		//Add it
		this.gameItems.push(item);

		//Tell the game to redraw with the new object added
		this.redraw = true;
	},

	//TODO: delete an item
	removeItem: function(item) {
		throw 'Not implemented';
	},

	//Draws the canvas
	draw: function() {
		if(this.redraw == false) {
			return;
		}

		//Clear the canvas
		this.clear();

		//Draw all the stored game items
		for (var i = 0; i < this.gameItems.length; i++) {

			//Draw the game item
			this.gameItems[i].draw();
		}

		//Dont redraw anymore
		this.redraw = false;
	},

	//Clears out the canvas
	clear: function() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	//onMouseDown
	onMouseDown: function(e) {
		var mouse = this.getMouse(e);

		//Loop through all the items to see if we clicked on one
		for (var i = this.gameItems.length-1; i >= 0; i--) {

			//TODO: Need to filter through objects so a double click
			//		will draw an object behind the selected one on top

			//Compare the bounds of the item vs the mouse click pos
			if (this.gameItems[i].inBounds(mouse.x, mouse.y)) {
				var selection = this.gameItems[i];

				//Call any item procedures
				selection.dragging = true;
				selection.onMouseDown();

				//Set local values
				this.cacheMouseX = mouse.x - selection.x;
				this.cacheMouseY = mouse.y - selection.y;
				this.dragging = true;
				this.itemSelected = selection;

				//Exit for loop
				return;
			}

		}
	},

	//onMouseUp
	onMouseUp: function(e) {
		if(this.dragging == false) {
			return false;
		}

		this.dragging = false;
		this.itemSelected.dragging = false;
		this.itemSelected = undefined;
	},

	//onMouseMove
	onMouseMove: function(e) {
		if(this.dragging == false) {
			return false;
		}

		var mouse = this.getMouse(e),
			posX, posY,
			minX = this.itemSelected.offset().x,
			maxX = this.canvas.width() - this.itemSelected.width + this.itemSelected.offset().x,
			minY = this.itemSelected.offset().y,
			maxY = this.canvas.height() - this.itemSelected.height + this.itemSelected.offset().y;

		//Clamp x and y positions to prevent object from dragging outside of canvas
		posX = mouse.x - this.cacheMouseX;
		posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
		posY = mouse.y - this.cacheMouseY;
		posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

		this.itemSelected.x = posX;
		this.itemSelected.y = posY;   

		this.redraw = true;
	},

	//onMouseLeave
	onMouseLeave: function(e) {
		this.dragging = false;

		if(this.itemSelected !== undefined) {
			this.itemSelected.dragging = false;
		}

		this.itemSelected = undefined;
	},

	//Called when a shape is selected from the sidebar
	onAddShapeClick: function(sender) {
		//Get the type of shape
		var data = $(sender).data('shape'),
			object = undefined;

		//Check through shapes, default to square
		switch(data) {
			case 'circle': 
				object = new Circle().init(50, 50, 70, 70, 'red');
				break;
			default: 
				object = new Square().init(50, 50, 70, 70, 'blue');
				break;
		}

		//Add the shape to the canvas
		this.addItem(object);
	},

	//Get relative mouse x and y (to canvas)
	getMouse: function(e) {
		//Get the bounding rect and subtract it's offset
		var bRect = this.canvas[0].getBoundingClientRect();
		mouseX = (e.clientX - bRect.left) * (this.canvas.width() / bRect.width);
		mouseY = (e.clientY - bRect.top) * (this.canvas.height() / bRect.height);

		//Return back the cordinates
		return { x: mouseX, y: mouseY };
	},
}