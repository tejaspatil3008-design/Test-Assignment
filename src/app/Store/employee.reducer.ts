import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as EmpActions from './employee.actions';
import { Employee } from '../Model/employee';

export const employeeFeatureKey = 'employees';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: any | null;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>({
  selectId: (emp) => emp.id!, // MockAPI returns string ids
});

export const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const employeeReducer = createReducer(
  initialState,

  // load
  on(EmpActions.loadEmployees, (state) => ({ ...state, loading: true })),
  on(EmpActions.loadEmployeesSuccess, (state, { employees }) =>
    adapter.setAll(employees, { ...state, loading: false })
  ),
  on(EmpActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // add
  on(EmpActions.addEmployeeSuccess, (state, { employee }) =>
    adapter.addOne(employee, state)
  ),

  // update
  on(EmpActions.updateEmployeeSuccess, (state, { employee }) =>
    adapter.updateOne({ id: employee.id!, changes: employee }, state)
  ),

  // delete
  on(EmpActions.deleteEmployeeSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  )
);

// adapter selectors (expect EmployeeState)
export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
