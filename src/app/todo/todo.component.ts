import { Component } from '@angular/core';

interface Task {
  id: number;
  name: string;
  status: 'pending' | 'doing' | 'done';
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks: Task[] = [
    { id: 1, name: 'Estudar Angular', status: 'pending' },
    { id: 2, name: 'Revisar TypeScript', status: 'pending' },
    { id: 3, name: 'Praticar HTML/CSS', status: 'pending' },
    { id: 4, name: 'Fixar typeScript', status: 'pending' },
    

  ];
  tasksDoing: Task[] = [
    { id: 5, name: 'Desenvolver App ToDo', status: 'doing' },
    { id: 6, name: 'Escrever documentação', status: 'doing' },
    { id: 7, name: 'Criar testes unitários', status: 'doing' },
    { id: 8, name: 'Criar o site TodoList', status: 'doing' }
  ];
  tasksDone: Task[] = [
    { id: 9, name: 'Configurar ambiente de desenvolvimento', status: 'done' },
    { id: 10, name: 'Leitura sobre Angular CLI', status: 'done' },
    { id: 11, name: 'Assistir tutoriais de Angular', status: 'done' },
    { id: 12, name: 'Participar da primeira aula da NTT-ACADEMY', status: 'done' }
  ];
  newTaskName: string = '';
  nextId: number = 13;

  addTask() {
    if (this.newTaskName !== '') {
      const newTask: Task = {
        id: this.nextId++,
        name: this.newTaskName,
        status: 'pending'
      };
      this.tasks.push(newTask);
      this.newTaskName = '';
    }
  }
  
  formatTaskName(name: string): string {
    const maxWords = 4;
    const maxChars = 21;
    let formattedName = name.split(' ').slice(0, maxWords).join(' ');

    if (formattedName.length > maxChars) {
      formattedName = formattedName.substring(0, maxChars - 3) + '...';
    } else if (formattedName !== name) {
      formattedName += '...';
    }
    
    return formattedName;
  }
  nextStep(taskId: number) {
    let task = this.tasks.find(task => task.id === taskId) ||
               this.tasksDoing.find(task => task.id === taskId);
    if (task) {
      switch (task.status) {
        case 'pending':
          this.tasks = this.tasks.filter(task => task.id !== taskId); 
          task.status = 'doing';
          this.tasksDoing.push(task);
          break;
        case 'doing':
       
          this.tasksDoing = this.tasksDoing.filter(task => task.id !== taskId);
          task.status = 'done';
          this.tasksDone.push(task);
          break;
      }
    }
  }
  deleteTask(taskId: number, status: 'pending' | 'doing' | 'done') {
    if (status === 'pending') {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    } else if (status === 'doing') {
      this.tasksDoing = this.tasksDoing.filter(task => task.id !== taskId);
    } else if (status === 'done') {
      this.tasksDone = this.tasksDone.filter(task => task.id !== taskId);
    }
  }
}