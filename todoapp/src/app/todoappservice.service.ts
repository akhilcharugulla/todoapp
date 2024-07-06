import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoappserviceService {


  constructor(private http: HttpClient) { }
  private baseUri = "http://localhost:8090/v1/todosapp"

  createTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.baseUri + "/createtodo",todo)
  }

  getTodoById(id: any) : Observable<Todo>{
    //this.http.get(this.baseUri + "todo/"+id)
    return this.http.get<Todo>(`${this.baseUri}/todo/${id}`)
  }

  getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUri + "/todos")
  }

  getTodosBySearchText(searchValue: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUri}/todos/search`,{params:{searchTerm:searchValue}})
  }

  updateTodo(updatedTodo:Todo, id: any):Observable<Todo>{
    return this.http.put<Todo>(`${this.baseUri}/todos/todo/${id}`, updatedTodo)
  }

  deleteTodo(id: number): Observable<any>{
    return this.http.delete(`${this.baseUri}/deletetodo/${id}`);
  }
}