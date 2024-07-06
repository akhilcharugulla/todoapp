package com.akh.todoapp.service;
import org.springframework.stereotype.Service;
import com.akh.todoapp.entity.Todo;
import com.akh.todoapp.repository.TodoRepository;
import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {
	private final TodoRepository todorepository;
	TodoServiceImpl(TodoRepository todorepository){
		this.todorepository =  todorepository;
	}
	
	@Override
	public Todo createTodo(Todo newTodo) {
		return this.todorepository.save(newTodo);
	}

	@Override
	public Todo getTodoById(Long id) {
		System.out.println(id);
		if(todorepository.findById(id).isPresent()){
			return todorepository.findById(id).get();
		}
		return null;
	}

	@Override
	public List<Todo> getAllTodos() {
		return todorepository.findAll();
	}

	@Override
	public Todo updateTodo(Long id, Todo updatedTodo) {
		return todorepository.save(updatedTodo);
	}

	@Override
	public void deleteTodo(Long id) {
		System.out.println(id);
		todorepository.deleteById(id);
	}

	@Override
	public List<Todo> getTodoWithSearchText(String searchTerm) {
		return todorepository.getTodoWithSearchText(searchTerm);
	}

//	@Override
//	public List<Todo> getTodoWithSearchText(String searchTerm) {
//		return todorepository.findByNameContaining(searchTerm);
//	}
}