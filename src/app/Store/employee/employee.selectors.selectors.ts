import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employeeFeatureKey, EmployeeState, selectAll } from '../employee.reducer';

// feature slice selector (name must match how you registered the feature in StoreModule)
export const selectEmployeeState =
  createFeatureSelector<EmployeeState>(employeeFeatureKey);

// get array of Employee
export const selectAllEmployees = createSelector(
  selectEmployeeState,
  selectAll // adapter selector
);

// loading and error
export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  (state) => state.loading
);

export const selectEmployeesError = createSelector(
  selectEmployeeState,
  (state) => state.error
);
