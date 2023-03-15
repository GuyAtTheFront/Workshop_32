import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Form, ModifiedTask } from '../models';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})
export class ShowTasksComponent {

  @Input()
  tasks!: Form[];
  
  @Output()
  selectedTask = new Subject<ModifiedTask>();

  @Output()
  deletedTask = new Subject<number>();

  onTaskSelected(idx: number) {
    console.log(idx);
    // let c = {... this.tasks[idx]}
    let modified = this.tasks[idx] as ModifiedTask;
    modified.index = idx;
    this.selectedTask.next(modified);
  }

  onDeleteTask(idx: number) {
    this.deletedTask.next(idx);
  }

}
