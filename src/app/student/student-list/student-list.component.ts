import {Component, inject, OnInit} from '@angular/core';
import {StudentsService} from '../students.service';
import {JsonPipe, Location} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../share/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {SearchBoxComponent} from "../../share/search-box/search-box.component";
import {LoadingSpinnerComponent} from "../../share/loading-spinner/loading-spinner.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [JsonPipe, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatFormField, MatInput, SearchBoxComponent, LoadingSpinnerComponent, MatIcon],
  template: `

    <div class="container mt-4">

      <div class="row mb-3">
        <div class="col-3" >
          <button (click)="goBack()" mat-icon-button>
            <mat-icon>arrow_back</mat-icon>
          </button>
        </div>
        <div class="col-6" style="border-bottom-style: solid" >
          <div class="text-center mb-4">
            <h1 class="display-4">Student List</h1>
            <p class="lead text-muted">Manage all students' information in one place</p>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <app-search-box (onDebounce)="search($event)"
                        (onValue)="search($event)"
                        [initialValue]="''"
                        placeholder='Searh by Name'
        >
        </app-search-box>

      </div>

      @if (!isLoaded) {

        <app-loading-spinner></app-loading-spinner>

      } @else {
        <mat-table [dataSource]="dataSource" class="mat-elevation-z8" matSort>
          <ng-container matColumnDef="firstName">
            <mat-header-cell *matHeaderCellDef mat-sort-header> First Name</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.firstName }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="lastName">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Last Name</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.lastName }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="parentPhone">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Parent Phone</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.parentPhone }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="parentEmail">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Parent Email</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.parentEmail }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="siblings">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Siblings</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.siblings }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="payment">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Payment</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.payment }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="studentStatus">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Student Status</mat-header-cell>
            <mat-cell *matCellDef="let element"> {{ element.studentStatus }}</mat-cell>
          </ng-container>

          <ng-container matColumnDef="actions">
            <mat-header-cell *matHeaderCellDef> Actions</mat-header-cell>
            <mat-cell *matCellDef="let element">
              <button (click)="confirmDelete(element.id)" color="warn" mat-button>Delete</button>
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row (click)="onRowClicked(row)" *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
      }

    </div>

  `,
  styles: [`
    @media (max-width: 900px) {
      .mat-column-siblings, .mat-column-parentEmail, .mat-column-studentStatus {
        display: none;
      }
    }

  `]
})
export class StudentListComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'parentPhone', 'parentEmail',
    'siblings', 'payment', 'studentStatus', 'actions'];

  dataSource!: MatTableDataSource<any>;
  protected studentData: any;
  protected isLoaded = false;
  private studentService = inject(StudentsService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  _location = inject(Location);

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.studentData = data;
      console.log(data)
      this.isLoaded = true;
    });
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteStudent(id);
    });

  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((student: any) => student.id !== id);
    });
  }

  onRowClicked(row: any): void {
    this.router.navigate(['/students', row.id]);
  }

  goBack() {
    this._location.back();
  }

  search(input: string) {
    this.dataSource.filter = input.trim().toLowerCase()
  }

}
