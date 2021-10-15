import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { Todo } from './../shared/todo.model';
import { DataService } from './../shared/data.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { EditdialogComponent } from './../editdialog/editdialog.component';
import tippy from 'tippy.js';
import { isNull } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit  {
  todo:Todo=new Todo("");
  todos: Todo[]=[]
  showValidationErrors:boolean=false;

  constructor(private dataservice:DataService, private dialog:MatDialog ) { }


  ngOnInit(): void {
    this.todos=this.dataservice.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true
    else{
      this.dataservice.addTodo(new Todo(form.value.task))
      form.reset()
      return this.showValidationErrors = false
    }
  }

  onTodoClicked(x:Todo){
    x.completed = !x.completed;
  }

  onEdit(todo:Todo){
    const index =this.todos.indexOf(todo);
    let dialogRef = this.dialog.open(EditdialogComponent, {width: '700px', data:todo});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataservice.updateTodo(index, result)
      }
    })
  }

  onDelete(todo:Todo){
    const index =this.todos.indexOf(todo);
    var con=confirm("Are you sure you want to delete this todo?")
    if(con) this.dataservice.deleteTodo(index);
  }
}
