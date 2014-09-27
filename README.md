jsquery
=======

Adds LINQ-style queries to the Array object.

Requires jQuery (for support for $.each).

Run select and other queries on Arrays and return matches based on evaluated criteria. Think of the way .sort() works with a function passed in and it's something similar.

The library extends the Array prototype with methods for select, selectById, take, sum, and average.

.where / .select
---
.where and .select are aliases of the same method and return an Array containing elements that matched criteria passed into them either as a property, or arrays of objects, or a function that returns true or false. In both cases the original array is left intact.

####Pass a function

Pass a function that returns true or false. The function must accept one parameter which is the value of the array being tested.

E.g. to select all items >= 5 from an array of numbers 1 to 10:
<pre>
var myArray = [1,2,3,4,5,6,7,8,9,10];
myArray.select(function(val){
	return val >= 5;
});
</pre>

This will return the array:

<pre>[5,6,7,8,9,10]</pre>

####Pass a property match

This is most useful if you have a database style array of objects. Pass in a value that must be matched

<pre>
var myArray = [
	{id : 6, name "Item six", type : 2},
	{id : 7, name "Item seven", type : 2},
	{id : 8, name "Item eight", type : 3},
	{id : 9, name "Item nine", type : 4}
];
myArray.select({id : 6});
</pre>

This will return an array with a single element:

<pre>[{id : 6, name "Item six", type : 2}]</pre>

It is identical to writing:

<pre>
myArray.select(function(val){
	return val.id == 6;
});
</pre>

The following would select multiple elements:

<pre>
myArray.select({type : 2});
</pre>

Which returns:

<pre>[{id : 6, name "Item six", type : 2},{id : 7, name "Item seven", type : 2}]</pre>

And is identical to:

<pre>
myArray.select(function(val){
	return val.type == 2;
});
</pre>

.selectById
---

If an object has an 'id' property then this will accept a single value and return a single object (or null if no object is found). In the previous example:

<pre>
var myArray = [
	{id : 6, name "Item six", type : 2},
	{id : 7, name "Item seven", type : 2},
	{id : 8, name "Item eight", type : 3},
	{id : 9, name "Item nine", type : 4}
];
myArray.selectById(6);
</pre>

Returns the object:

<pre>{id : 6, name "Item six", type : 2}</pre>

And is identical to:

<pre>
myArray.select({id : 6})[0];
</pre>

.take
---

Returns the first N items from a matched array. E.g.:

<pre>
var myArray = [
	{id : 6, name "Item six", type : 2},
	{id : 7, name "Item seven", type : 2},
	{id : 8, name "Item eight", type : 3},
	{id : 9, name "Item nine", type : 4}
];
myArray.take(2);
</pre>

returns:

<pre>[{id : 6, name "Item six", type : 2},{id : 7, name "Item seven", type : 2}]</pre>

.sum
---

Returns the sum of integers in an array (of integers) that match a criteria. E.g.:

<pre>
var myArray = [1,2,3,4,5,6,7,8,9,10];
myArray.sum();
</pre>

Returns the value 55.

To operate on arrays of objects pass in a selector function:

<pre>
var myArray = [
	{id : 6, name "Item six", type : 2},
	{id : 7, name "Item seven", type : 2},
	{id : 8, name "Item eight", type : 3},
	{id : 9, name "Item nine", type : 4}
];
myArray.sum(function(val){
	return val.type;
});
</pre>

Returns the value 11 (which is the sum of all the "type" properties).

.average
---

Returns the average value of items in an array. Can accept a selector function in the same way as .sum. E.g.:

<pre>
var myArray = [1,2,3,4,5,6,7,8,9,10];
myArray.average();
</pre>

Returns the value 5.5 (which is 55 / 10).

<pre>
var myArray = [
	{id : 6, name "Item six", type : 2},
	{id : 7, name "Item seven", type : 2},
	{id : 8, name "Item eight", type : 3},
	{id : 9, name "Item nine", type : 4}
];
myArray.average(function(val){
	return val.type;
});
</pre>

Returns the value 2.75 ( = 11 / 5).

Compound queries
---

As the objects returned from most methods (all except selectById) are Array objects, it's possible to string multiple queries together. E.g.:

<pre>
var myArray = [1,2,3,4,5,6,7,8,9,10];
myArray.select(function(val){
	return val >= 5;
}).sum();
</pre>

Returns the value 45 (the sum of values 5, 6, 7, 8, 9 and 10).