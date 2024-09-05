import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeService } from './employee.service'; // Atualize o caminho conforme necessário
import { Employee, EmployeeInput, EmployeeUpdateInput } from '../interfaces/employee'; // Atualize o caminho conforme necessário
import { Collection } from '../interfaces/collection'; // Atualize o caminho conforme necessário
import { IdentifierService } from './identifier/identifier.service'; // Atualize o caminho conforme necessário

describe('JsonCrudService', () => {
  let service: EmployeeService;
  let mockIdentifierService: jasmine.SpyObj<IdentifierService>;

  beforeEach(() => {
    mockIdentifierService = jasmine.createSpyObj('IdentifierService', ['getAndIncrement']);
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        { provide: IdentifierService, useValue: mockIdentifierService }
      ]
    });
    service = TestBed.inject(EmployeeService);
  });

  it('should create an employee and update the collection', () => {
    // Arrange
    const employeeInput: EmployeeInput = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555-555-5555',
      department: 'Engineering',
      role: 'Developer',
      dateJoined: '2024-01-01'
    };
    const newId = 1;
    mockIdentifierService.getAndIncrement.and.returnValue(newId);

    const expectedCollection: Collection<Employee> = {
      data: [{
        id: newId,
        ...employeeInput
      }]
    };

    // Act
    service.create(employeeInput);

    // Assert
    service.read().subscribe(collection => {
      expect(collection).toEqual(expectedCollection);
    });
  });

  it('should return the current employee collection as observable', () => {
    // Arrange
    const initialCollection: Collection<Employee> = { data: [] };
    const employeeCollection$ = new BehaviorSubject<Collection<Employee>>(initialCollection);
    (service as unknown as { employeeCollection$: Observable<Collection<Employee>> }).employeeCollection$ = employeeCollection$;

    // Act
    const result$ = service.read();

    // Assert
    result$.subscribe(result => {
      expect(result).toEqual(initialCollection);
    });
  });

  it('should delete an employee by id and update the collection', () => {
    // Arrange
    const employee1: Employee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 555-555-5555', department: 'Engineering', role: 'Developer', dateJoined: '2024-01-01' };
    const employee2: Employee = { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '+1 555-555-5555', department: 'Engineering', role: 'Developer', dateJoined: '2024-01-01' };
    const initialCollection: Collection<Employee> = { data: [employee1, employee2] };
    const expectedCollection: Collection<Employee> = { data: [employee2] };
    const idToDelete = 1;

    const employeeCollection$ = new BehaviorSubject<Collection<Employee>>(initialCollection);
    (service  as unknown as { employeeCollection$: Observable<Collection<Employee>> }).employeeCollection$ = employeeCollection$;

    // Act
    service.delete(idToDelete);

    // Assert
    service.read().subscribe(collection => {
      expect(collection).toEqual(expectedCollection);
    });
  });

  it('should update an employee by id and update the collection', () => {
    // Arrange
    const initialEmployee: Employee = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 555-555-5555', department: 'Engineering', role: 'Developer', dateJoined: '2024-01-01' };
    const updatedData: EmployeeUpdateInput = { email: 'new.email@example.com' };
    const updatedEmployee: Employee = { ...initialEmployee, ...updatedData };
    const initialCollection: Collection<Employee> = { data: [initialEmployee] };
    const expectedCollection: Collection<Employee> = { data: [updatedEmployee] };
    const idToUpdate = 1;

    const employeeCollection$ = new BehaviorSubject<Collection<Employee>>(initialCollection);
    (service  as unknown as { employeeCollection$: Observable<Collection<Employee>> }).employeeCollection$ = employeeCollection$;

    // Act
    service.update(idToUpdate, updatedData);

    // Assert
    service.read().subscribe(collection => {
      expect(collection).toEqual(expectedCollection);
    });
  });
});
