import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Form, ModifiedTask } from '../models';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})

export class AddTaskFormComponent implements OnInit, OnChanges{

  todoForm!: FormGroup;

  @Output()
  formDataAdded = new Subject<Form>();

  @Output()
  formDataModified = new Subject<ModifiedTask>();

  @Input()
  modifiedTask!: ModifiedTask | null;
  modifiedForm!: Form;

  @Input()
  isAddDisabled = false;

  @Input()
  isModifyDisabled = true;

  constructor(private fb: FormBuilder){};

  ngOnChanges(changes: SimpleChanges): void {
    if(null !== this.modifiedTask) this.setSelectedTask(this.modifiedTask!);
  }

  ngOnInit(): void {
    this.todoForm = this.createForm();
  }

  processForm() {
    const form = this.todoForm.value as Form;
    this.formDataAdded.next(form);
    console.log(form);
    //reset form
    this.todoForm = this.createForm();
  }

  private createForm(): FormGroup {
    console.log("form created!!!");
    return this.fb.group({
      description: this.fb.control<string>("", [Validators.required, Validators.minLength(5)]),
      priority: this.fb.control<string>("low", [Validators.required]),
      due: this.fb.control<String>(this.dateToString(new Date()), [Validators.required])
    })
  }  

  private dateToString(date : Date) {
    // let d = date.toUTCString().split(" ")
    // return "".concat(d[3], "-", d[2], "-", d[1])
    return "".concat(date.getFullYear().toString(), "-", date.getMonth().toString().padStart(2, "0"), "-", date.getDate().toString())
  }

  private setSelectedTask(task: Form) {
    this.todoForm.get("description")?.setValue(task.description);
    this.todoForm.get("priority")?.setValue(task.priority);
    this.todoForm.get("due")?.setValue(task.due);
  }

  onModifyTask() {

    this.modifiedTask!.description = this.todoForm.get("description")?.value;
    this.modifiedTask!.priority = this.todoForm.get("priority")?.value;
    this.modifiedTask!.due = this.todoForm.get("due")?.value;

    this.formDataModified.next(this.modifiedTask!);
    
    //reset form
    this.todoForm = this.createForm();
  }

}
