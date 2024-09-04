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
    expect(service['employeeCollection']['data'].length).toBe(1);
    expect(service['employeeCollection']['data'][0]).toEqual(mockEmployee);
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
    expect(service['employeeCollection']['data'].length).toBe(2);
    expect(service['employeeCollection']['data'][0].id).toBe(1);
    expect(service['employeeCollection']['data'][1].id).toBe(2);
    expect(identifierService.getAndIncrement).toHaveBeenCalledTimes(2);
  });

  it('should return a frozen array of employees', () => {
    // Arrange
    const employee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555-555-5555',
      department: 'Engineering',
      role: 'Software Engineer',
      dateJoined: '2023-09-01'
    };
    
    service['employeeCollection']['data'] = [employee];
    
    const result = service.show();

    // Assert
    expect(result).toEqual([employee]);
    expect(Object.isFrozen(result)).toBeTrue();
  });

  // Teste de imutabilidade
  it('should not allow modification of the returned array', () => {
    // Arrange
    const employee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555-555-5555',
      department: 'Engineering',
      role: 'Software Engineer',
      dateJoined: '2023-09-01'
    };

    // Act
    service['employeeCollection']['data'] = [employee];

    const result = service.show();

    // Assert
    expect(() => {
      (result as Employee[]).push({
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 555-666-7777',
        department: 'Marketing',
        role: 'Marketing Specialist',
        dateJoined: '2023-09-02'
      });
    }).toThrowError(TypeError); // O array não deve permitir a modificação
  });

  it('should delete an employee by id', () => {
    // Arrange
    const employee1: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555-555-5555',
      department: 'Engineering',
      role: 'Software Engineer',
      dateJoined: '2023-09-01'
    };

    const employee2: Employee = {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 555-666-7777',
      department: 'Marketing',
      role: 'Marketing Specialist',
      dateJoined: '2023-09-02'
    };

    service['employeeCollection']['data'] = [employee1, employee2];

    // Act
    const result = service.delete(employee1.id);

    // Assert
    expect(result).toBeTrue(); // Verifica que o funcionário foi deletado
    expect(service.show()).toEqual([employee2]); // Verifica que o funcionário restante é o correto
  });

  // Teste de tentativa de deletar um ID inexistente
  it('should return false when trying to delete an employee that does not exist', () => {
    // Arrange
    const employee: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 555-555-5555',
      department: 'Engineering',
      role: 'Software Engineer',
      dateJoined: '2023-09-01'
    };

    
    service['employeeCollection']['data'] = [employee];

    // Act
    const result = service.delete(999); // ID que não existe

    // Assert
    expect(result).toBeFalse(); // Verifica que o retorno é falso
    expect(service.show()).toEqual([employee]); // Verifica que o funcionário ainda está presente
  });
});
