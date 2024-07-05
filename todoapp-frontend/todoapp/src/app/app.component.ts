import { TodoappserviceService } from './todoappservice.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Todo } from './Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatCardModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSnackBarModule,MatCheckboxModule,MatButtonModule
    ,ReactiveFormsModule, CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{

  allTodos : Todo[] = []
  title = 'todo-fullstack';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  todoFormGroup!: FormGroup;
  todo! : Todo;
  isEditMode: boolean = false;
  searchText: string = "";
  //searchTextControl: FormControl;

  constructor(private _snackBar:MatSnackBar, private todoappserviceService: TodoappserviceService){}

  ngOnInit(): void {
    this.todoFormGroup = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null),
        description: new FormControl(null),
        completed: new FormControl(false) 
      })
      this.getAlltodos();

      //this.searchText = this.todoFormGroup.get('searchText') as FormControl;

    }

    onSubmit() {
      if(this.isEditMode){
        this.handleUpdate()
      }
      else{
        this.handleCreate()
      }
    }
    
    handleCreate() {
      this.todo = this.todoFormGroup.value
      this.todoappserviceService.createTodo(this.todo).subscribe((newTodo) => {
        this.openSnackBar(this.todo.name);
        this.getAlltodos();
        this.resetForm();
      });
    }
    
    handleUpdate() {
      this.todo = this.todoFormGroup.value
      this.todoappserviceService.updateTodo(this.todo, this.todo.id).subscribe(() => {
        this.openSnackBar(`Updated: ${this.todo.name}`);
        this.getAlltodos();
        this.resetForm();
      });
    }
    
    resetForm() {
      this.todoFormGroup.reset({
        id: null,
        name: '',
        description: '',
        completed: false
      });
      this.isEditMode = false;
    }

  getAlltodos(){
    this.todoappserviceService.getAllTodos().subscribe((data)=>{
      this.allTodos = data
    })
  }
  
  updateTodo(todoData: Todo) {
    this.todoappserviceService.getTodoById(todoData.id).subscribe((data)=>{
      delete data.dateCreated;
      delete data.lastUpdated;
      this.todoFormGroup.setValue(data)
    })
    this.isEditMode = true;
  }

  deleteTodo(id: any) {
    this.todoappserviceService.deleteTodo(id).subscribe(()=>{
      console.log("deleted succesfully")
      this.getAlltodos()
    })
  }

  openSnackBar(todoName : string) {
    this._snackBar.open(todoName, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }

}