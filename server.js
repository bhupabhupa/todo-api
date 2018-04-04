var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

var todos = [];
var todoNextId = 1;

app.get('/', function(req, res){
	res.send('Todo api list');
});


//POST /todos
app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(404).send();
	}
	
	body.description = body.description.trim();
	body.id = todoNextId;
	todoNextId++;
	todos.push(body);
	res.json(body);
});

//GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
});

//Get /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchTodo = _.findWhere(todos, {id: todoId});
	/*var matchTodo;
	todos.forEach(function(todo){
		if(todoId === todo.id) {
			matchTodo = todo;
		}
	});*/

	if(matchTodo) {
		res.send(matchTodo);
	} else {
		res.status(404).send();		
	}
});

//Delete /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchTodo = _.findWhere(todos, {id: todoId});

	if(matchTodo) {
		var todos = _.without(todos, matchTodo);	
	} else {
		res.status(404).json({"error": "no todo with that id"})
	}
	res.send(todos);
})

//Update //todos/:id
app.put('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchTodo = _.findWhere(todos, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validateAttributes = {};

	if(!matchTodo) {
		res.status(404).json({"error": "no todo with that id"})
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validateAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).json({"error": "Wrong Completed"});
	}

	console.log(body.description);

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validateAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).json({"error": "Wrong Description"});
	}
	
	_.extend(matchTodo, validateAttributes);
	res.json(matchTodo);

});


app.listen(PORT, function(){
	console.log('Express listing on port ' + PORT + '!');
})