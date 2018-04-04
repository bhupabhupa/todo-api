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

app.listen(PORT, function(){
	console.log('Express listing on port ' + PORT + '!');
})