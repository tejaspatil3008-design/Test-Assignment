import { Employee } from '../../Model/employee';
import { adapter } from '../employee.reducer';
import { selectAllEmployees, selectEmployeesLoading } from './employee.selectors.selectors';

describe('Employee selectors', () => {
  const employees: Employee[] = [
  ];

  // start from adapter initial state and set all employees
  const initialState = adapter.getInitialState({ loading: false, error: null });
  const stateWithEmployees = adapter.setAll(employees, initialState);

  it('selectAllEmployees should return all employees', () => {
    const result = selectAllEmployees.projector(stateWithEmployees);
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('John');
  });

  it('selectEmployeesLoading should return loading flag', () => {
    const loadingState = { ...stateWithEmployees, loading: true };
    const result = selectEmployeesLoading.projector(loadingState);
    expect(result).toBe(true);
  });
});
