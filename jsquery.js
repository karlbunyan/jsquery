/*
 * LINQ style queries for Array objects
 * version 0.0.1
 * Released under the MIT license.
 */
/*
Pass in a function that acts as a test criteria. Returns an array of elements that match that criteria
Or pass in an object with name/values to match and objects that meet criteria are returned e.g. where({something : true})
 */
Array.prototype.each = function(callback){
	return jQuery.each(this,callback);
};

Array.prototype.where = function(test){
	var out = [];
	if(typeof(test) == 'function'){
		this.each(function(){
			if(test(this)){
				out.push(this);
			}
		});
	}else{
		this.each(function(){
			for(var name in test){
				if(this[name] == test[name]){
					out.push(this);
				}
			}
		});
	}
	return out;
};

/*
Pass in a function that selects a property
 */
Array.prototype.select = Array.prototype.where;

/*
 Pass in an id to select
 */
Array.prototype.selectById = function(id){
	var out = null;
	this.each(function(){
		if(this.id == id){
			out = this;
		}
	});
	return out;
};

/*
Take the first N elements from
 */
Array.prototype.take = function(number){
	var out = [];
	for(var i=0;i<number && i<this.length;i++){
		out.push(this[i]);
	}
	return out;
};

/*
If the set isn't numbers, pass in a selector function to query a property and return a number
 */
Array.prototype.sum = function(selector){
	var sum = 0;
	this.each(function(){
		if(selector){
			sum += selector(this);
		}else{
			sum += this.valueOf();
		}
	});
	return sum;
};

/*
 If the set isn't numbers, pass in a selector function to query a property and return a number
 */
Array.prototype.average = function(selector){
	return this.sum(selector)/this.length;
};
