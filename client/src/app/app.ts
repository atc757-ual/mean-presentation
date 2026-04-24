import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tasks';

  tasks: Task[] = [];
  newTaskTitle = '';
  newTaskDesc = '';

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe(data => {
      this.tasks = data;
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    const task: Task = {
      title: this.newTaskTitle,
      description: this.newTaskDesc,
      completed: false
    };

    this.http.post<Task>(this.apiUrl, task).subscribe(newTask => {
      this.tasks.unshift(newTask);
      this.newTaskTitle = '';
      this.newTaskDesc = '';
    });
  }

  toggleTask(task: Task) {
    this.http.patch<Task>(`${this.apiUrl}/${task._id}`, {}).subscribe(updated => {
      task.completed = updated.completed;
    });
  }

  deleteTask(task: Task) {
    this.http.delete(`${this.apiUrl}/${task._id}`).subscribe(() => {
      this.tasks = this.tasks.filter(t => t._id !== task._id);
    });
  }
}
