import { TestBed } from '@angular/core/testing';
import { JsonCrudService } from './json-crud.service';
import { IdentifierService } from './identifier/identifier.service';
import { Employee } from '../types/employee.type';
import { EmployeeInput } from '../types/employeeInput.type';

describe('JsonCrudService', () => {
  let service: JsonCrudService;
  let identifierService: jasmine.SpyObj<IdentifierService>;

  beforeEach(() => {
    const identifierSpy = jasmine.createSpyObj('IdentifierService', ['getAndIncrement']);

    TestBed.configureTestingModule({
      providers: [
        JsonCrudService,
        { provide: IdentifierService, useValue: identifierSpy }
      ]
    });

    service = TestBed.inject(JsonCrudService);
    identifierService = TestBed.inject(IdentifierService) as jasmine.SpyObj<IdentifierService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an employee and add it to the data array', () => {
    // Arrange
    const mockId = 1;
    const mockEmployee: Employee = {
      id: mockId,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555-555-5555',
      department: 'Engineering',
      role: 'Software Engineer',
      dateJoined: '2023-09-01'
    };

    identifierService.getAndIncrement.and.returnValue(mockId);

    const input: EmployeeInput = {
      name: mockEmployee.name,
      email: mockEmployee.email,
      phone: mockEmployee.phone,
      department: mockEmployee.department,
      role: mockEmployee.role,
      dateJoined: mockEmployee.dateJoined
    }

    // Act
    service.create(input);

    // Assert
    expect(service['data'].length).toBe(1);
    expect(service['data'][0]).toEqual(mockEmployee);
    expect(identifierService.getAndIncrement).toHaveBeenCalled();
  });

  it('should generate unique IDs for each employee', () => {
    // Arrange
    identifierService.getAndIncrement.and.returnValues(1, 2, 3);

    // Act
    const actor1: EmployeeInput = {
      name: 'Alice', 
      email: 'alice@example.com', 
      phone: '+1 555-111-1111', 
      department: 'HR', 
      role: 'Manager', 
      dateJoined: '2023-09-02'
    }

    const actor2: EmployeeInput = {
      name: 'Bob', 
      email: 'bob@example.com', 
      phone: '+1 555-222-2222', 
      department: 'Finance', 
      role: 'Analyst', 
      dateJoined: '2023-09-03'
    }
    service.create(actor1);
    service.create(actor2);

    // Assert
    expect(service['data'].length).toBe(2);
    expect(service['data'][0].id).toBe(1);
    expect(service['data'][1].id).toBe(2);
    expect(identifierService.getAndIncrement).toHaveBeenCalledTimes(2);
  });
});
