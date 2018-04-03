var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'Wake up early',
	completed: false
},
{
	id: 2,
	description: 'Go and workout',
	completed: false
},
{
	id: 3,
	description: 'Have breakfast',
	completed: true
}];

app.get('/', function(req, res){
	res.send('Todo api list');
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