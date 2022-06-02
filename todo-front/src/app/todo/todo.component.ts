import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  title: any;
  description: any;
  constructor(private apiService: ApiService, public dailogRef: MatDialogRef<TodoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dailogRef.close()
  }

  createTodo() {
    this.dailogRef.close({
      title:this.title,
      description:this.description
    })
  }


}
