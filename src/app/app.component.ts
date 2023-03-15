import { Component } from '@angular/core';
import { Form, ModifiedTask } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ws32';

  modifiedTask!: ModifiedTask | null;

  tasks: Form[] = [];

  isAddDisabled: boolean = false;
  isModifyDisabled: boolean = true;

  addToTasks(task: Form){
    this.tasks.push(task);
  }

  onTaskSelected(task: ModifiedTask) {
    // console.log(task);
    this.modifiedTask = task;
    this.toggleModifyMode();
  }

  modifyTask(modifiedTask: ModifiedTask){
    
    let newTask: Form = {
      description: modifiedTask.description,
      priority: modifiedTask.priority,
      due: modifiedTask.due
      }
    this.tasks[modifiedTask.index] = newTask;

    this.toggleAddMode();
  }

  private toggleAddMode() {
    this.modifiedTask = null;
    this.isAddDisabled = false;
    this.isModifyDisabled = true;
  }

  private toggleModifyMode() {
    this.isAddDisabled = true;
    this.isModifyDisabled = false;
  }

  onTaskDelete(idx: number){
    this.tasks.splice(idx, 1);
    this.toggleAddMode();
  }

}

