import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EmpActions from './employee.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { EmployeesService } from '../Services/employees.service';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions, private empService: EmployeesService, private router: Router) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpActions.loadEmployees),
      mergeMap(() =>
        this.empService.getEmployees().pipe(
          map((emps) => EmpActions.loadEmployeesSuccess({ employees: emps })),
          catchError((err) =>
            of(EmpActions.loadEmployeesFailure({ error: err }))
          )
        )
      )
    )
  );

addEmployee$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmpActions.addEmployee),
    mergeMap((action) =>
      this.empService.addEmployee(action.employee).pipe(
        map((emp) => EmpActions.addEmployeeSuccess({ employee: emp })),
        catchError(() => of(EmpActions.loadEmployeesFailure({ error: 'Add failed' })))
      )
    )
  )
);

navigateAfterAdd$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EmpActions.addEmployeeSuccess),
    tap(() => {
      alert('Employee created successfully!');
      this.router.navigate(['/employee']);
    })
  ),
  { dispatch: false } // No further action dispatched
);



  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpActions.updateEmployee),
      mergeMap((action) =>
        this.empService.updateEmployee(action.id, action.employee).pipe(
          map((emp) => EmpActions.updateEmployeeSuccess({ employee: emp })),
          catchError((err) =>
            of(EmpActions.loadEmployeesFailure({ error: err }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpActions.deleteEmployee),
      mergeMap((action) =>
        this.empService.deleteEmployee(action.id).pipe(
          map(() => EmpActions.deleteEmployeeSuccess({ id: action.id })),
          catchError((err) =>
            of(EmpActions.loadEmployeesFailure({ error: err }))
          )
        )
      )
    )
  );
}
