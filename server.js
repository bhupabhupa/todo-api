var express = require('express');
var bodyParser = require('body-parser');
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
	var body = req.body;
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
	var matchTodo;
	//console.log(id);
	//res.send(todos[id]);
	/*for (var i = 0; i < todos.length; i++) {
		console.log(todos[i]);
		if(todos[i].id === parseInt(id)) {
			res.send(todos[i]);
		}
	}*/

	todos.forEach(function(todo){
		if(todoId === todo.id) {
			matchTodo = todo;
		}
	});

	if(matchTodo) {
		res.send(matchTodo);
	} else {
		res.status(404).send();		
	}
});

app.listen(PORT, function(){
	console.log('Express listing on port ' + PORT + '!');
})