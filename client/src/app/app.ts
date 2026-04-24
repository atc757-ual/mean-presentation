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

  // Modal state
  showModal = false;
  taskToDelete: Task | null = null;

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error fetching tasks', err)
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    const task: Task = {
      title: this.newTaskTitle,
      description: this.newTaskDesc,
      completed: false
    };

    this.http.post<Task>(this.apiUrl, task).subscribe({
      next: (newTask) => {
        this.tasks.unshift(newTask);
        this.newTaskTitle = '';
        this.newTaskDesc = '';
      },
      error: (err) => console.error('Error adding task', err)
    });
  }

  toggleTask(task: Task) {
    this.http.patch<Task>(`${this.apiUrl}/${task._id}`, {}).subscribe({
      next: (updated) => task.completed = updated.completed,
      error: (err) => console.error('Error updating task', err)
    });
  }

  confirmDelete(task: Task) {
    this.taskToDelete = task;
    this.showModal = true;
  }

  deleteTask() {
    if (!this.taskToDelete) return;
    
    this.http.delete(`${this.apiUrl}/${this.taskToDelete._id}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== this.taskToDelete?._id);
        this.showModal = false;
        this.taskToDelete = null;
      },
      error: (err) => {
        console.error('Error deleting task', err);
        this.showModal = false;
      }
    });
  }
}
