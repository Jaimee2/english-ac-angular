import {Component, inject, OnInit} from '@angular/core';
import {StudentsService} from '../students.service';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    JsonPipe
  ],
  template: `
    <p>
      student-list works!

      {{ aux | json }}
    </p>
  `,
  styles: ``
})
export class StudentListComponent implements OnInit {

  private studentService = inject(StudentsService);
  protected aux: any;

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => {
      console.log(data)
      this.aux = data;
    });

  }


}
