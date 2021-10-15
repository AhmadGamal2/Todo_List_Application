import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from './../shared/todo.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent implements OnInit {

  constructor(public dialogref:MatDialogRef<EditdialogComponent>, @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

  ngOnInit(): void {
  }

  onFormSubmit(form:NgForm){
    if (form.invalid) return
    const updatedTodo = {
      ...this.todo,
      ...form.value
    }

    this.dialogref.close(updatedTodo)
  }

  close(){
    this.dialogref.close();
  }

}
