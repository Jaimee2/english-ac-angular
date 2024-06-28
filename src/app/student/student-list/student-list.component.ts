import {Component, inject, OnInit} from '@angular/core';
import {StudentsService} from '../students.service';
import {JsonPipe} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [JsonPipe, MatTableModule, MatPaginatorModule, MatSortModule],
  template: `

    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <!-- Header Section -->
          <div class="text-center mb-4">
            <h1 class="display-4">Student List</h1>
            <p class="lead text-muted">Manage all students' information in one place</p>
          </div>

          <div class="table-responsive">
            <mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">

              <!-- ID Column -->
              <ng-container matColumnDef="id">
                <mat-header-cell *matHeaderCellDef mat-sort-header> ID </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.id}} </mat-cell>
              </ng-container>

              <!-- First Name Column -->
              <ng-container matColumnDef="firstName">
                <mat-header-cell *matHeaderCellDef mat-sort-header> First Name </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.firstName}} </mat-cell>
              </ng-container>

              <!-- Last Name Column -->
              <ng-container matColumnDef="lastName">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Last Name </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.lastName}} </mat-cell>
              </ng-container>

              <!-- Address Column -->
              <ng-container matColumnDef="address">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Address </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.address}} </mat-cell>
              </ng-container>

              <!-- Parent Phone Column -->
              <ng-container matColumnDef="parentPhone">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Parent Phone </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.parentPhone}} </mat-cell>
              </ng-container>

              <!-- Parent Email Column -->
              <ng-container matColumnDef="parentEmail">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Parent Email </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.parentEmail}} </mat-cell>
              </ng-container>

              <!-- Siblings Column -->
              <ng-container matColumnDef="siblings">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Siblings </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.siblings}} </mat-cell>
              </ng-container>

              <!-- Notes Column -->
              <ng-container matColumnDef="notes">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Notes </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.notes}} </mat-cell>
              </ng-container>

              <!-- Books Column -->
              <ng-container matColumnDef="books">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Books </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.books}} </mat-cell>
              </ng-container>

              <!-- Payment Column -->
              <ng-container matColumnDef="payment">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Payment </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.payment}} </mat-cell>
              </ng-container>

              <!-- Student Status Column -->
              <ng-container matColumnDef="studentStatus">
                <mat-header-cell *matHeaderCellDef mat-sort-header> Student Status </mat-header-cell>
                <mat-cell *matCellDef="let element"> {{element.studentStatus}} </mat-cell>
              </ng-container>

              <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
              <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
            </mat-table>
            <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
          </div>
        </div>
      </div>
    </div>



  `,
  styles: [`.table-responsive {
    margin-top: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .mat-header-cell, .mat-cell {
    padding: 8px 16px;
  }

  .header-section {
    margin-bottom: 40px;
  }

  .header-section h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .header-section p {
    font-size: 1.2rem;
    color: #6c757d;
  }

  @media (max-width: 600px) {
    .mat-header-cell, .mat-cell {
      padding: 8px 8px;
    }
  }
  `]
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'parentPhone',
    'parentEmail', 'siblings', 'notes', 'books', 'payment', 'studentStatus'];

  // @ts-ignore
  dataSource: MatTableDataSource<any>;

  protected studentData: any;

  private studentService = inject(StudentsService);

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.studentData = data;
    });
  }

}
