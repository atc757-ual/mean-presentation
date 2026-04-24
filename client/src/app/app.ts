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
  
  // Create state
  newTaskTitle = '';
  newTaskDesc = '';

  // Edit state
  isEditing = false;
  editingTask: Task | null = null;

  // Delete modal state
  showDeleteModal = false;
  taskToDelete: Task | null = null;

  // Toast state
  toast = { show: false, message: '', isError: false };

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (data) => this.tasks = data,
      error: () => this.showToast('Error al cargar tareas', true)
    });
  }

  showToast(message: string, isError = false) {
    this.toast = { show: true, message, isError };
    setTimeout(() => this.toast.show = false, 3000);
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
        this.showToast('Tarea añadida con éxito');
      },
      error: () => this.showToast('Error al crear la tarea', true)
    });
  }

  startEdit(task: Task) {
    this.isEditing = true;
    this.editingTask = { ...task }; // Clone to avoid direct mutation
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingTask = null;
  }

  updateTask() {
    if (!this.editingTask || !this.editingTask.title.trim()) return;

    this.http.patch<Task>(`${this.apiUrl}/${this.editingTask._id}`, this.editingTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex(t => t._id === updated._id);
        if (index !== -1) this.tasks[index] = updated;
        this.cancelEdit();
        this.showToast('Tarea actualizada');
      },
      error: () => this.showToast('Error al actualizar tarea', true)
    });
  }

  toggleTask(task: Task) {
    this.http.patch<Task>(`${this.apiUrl}/${task._id}`, {}).subscribe({
      next: (updated) => {
        task.completed = updated.completed;
        this.showToast(task.completed ? 'Tarea completada' : 'Tarea pendiente');
      },
      error: () => this.showToast('Error al actualizar tarea', true)
    });
  }

  confirmDelete(task: Task) {
    this.taskToDelete = task;
    this.showDeleteModal = true;
  }

  deleteTask() {
    if (!this.taskToDelete) return;
    
    this.http.delete(`${this.apiUrl}/${this.taskToDelete._id}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t._id !== this.taskToDelete?._id);
        this.showDeleteModal = false;
        this.taskToDelete = null;
        this.showToast('Tarea eliminada');
      },
      error: () => {
        this.showToast('Error al eliminar la tarea', true);
        this.showDeleteModal = false;
      }
    });
  }
}
