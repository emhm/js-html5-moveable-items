/**
 * The base class system.
 * ref Isogenic Engine
 */
var BaseClass = (function () {
	var initializing = false;

	// The base Class implementation (does nothing)
	BaseClass = function () {},

	/**
	 * Copies all properties and methods from the classObj object
	 * to "this". If the overwrite flag is not set or set to false,
	 * only properties and methods that don't already exists in
	 * "this" will be copied. If overwrite is true, they will be
	 * copied regardless.
	 * @param {Function} classObj
	 * @param {Boolean} overwrite
	 */
	implement = function (classObj, overwrite) {
		var i, obj = classObj.prototype || classObj;

		// Copy the class object's properties to (this)
		for (i in obj) {
			// Only copy the property if this doesn't already have it
			if (obj.hasOwnProperty(i) && (overwrite || this[i] === undefined)) {
				this[i] = obj[i];
			}
		}
		return this;
	},

	/**
	 * Create a new BaseClass that inherits from this class
	 * @name extend
	 * @example #Creating a new class by extending an existing one
	 *     var NewClass = BaseClass.extend({
	 *         // Init is your constructor
	 *         init: function () {
	 *             console.log('I\'m alive!');
	 *         }
	 *     });
	 * 
	 * @return {Function}
	 */
	BaseClass.extend = function () {
		var name,
			prototype,
			// Set prop to the last argument passed
			prop = arguments[arguments.length - 1],
			extensionArray = arguments[0];

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (name in prop) {
			if (prop.hasOwnProperty(name)) {
				// Copy the property
				prototype[name] = prop[name];
			}
		}

		// The dummy class constructor
		function BaseClass() {
			if (!initializing && this.init) {
				// Call the class init method
				this.init.apply(this, arguments);
			}
		}

		// Populate our constructed prototype object
		BaseClass.prototype = prototype;

		// Enforce the constructor to be what we expect
		BaseClass.prototype.constructor = BaseClass;

		// And make this class extensible
		BaseClass.extend = arguments.callee;

		// Add the implement method
		BaseClass.prototype.implement = implement;

		return BaseClass;
	};

	return BaseClass;
}());