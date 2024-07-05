package com.akh.todoapp.service;
import com.akh.todoapp.entity.Todo;
import java.util.List;

public interface TodoService {

	Todo createTodo(Todo newTodo);

	Todo getTodoById(Long id);

	List<Todo> getAllTodos();

	Todo updateTodo(Long id, Todo updatedTodo);

	void deleteTodo(Long id);
}