import { TestBed } from '@angular/core/testing';

import { IdentifierService } from './identifier.service';

describe('IdentifierService', () => {
  let service: IdentifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return 0 on first call', () => {
    const id = service.getAndIncrement();
    expect(id).toBe(0);
  });

  it('should increment id by 1 on each call', () => {
    const firstId = service.getAndIncrement();
    const secondId = service.getAndIncrement();
    expect(secondId).toBe(firstId + 1);
  });

  it('should return consecutive numbers on consecutive calls', () => {
    const ids = [service.getAndIncrement(), service.getAndIncrement(), service.getAndIncrement()];
    expect(ids).toEqual([0, 1, 2]);
  });

  it('should return sequential numbers starting from the initial value on successive calls', () => {
    service.set(10);
    const ids = [service.getAndIncrement(), service.getAndIncrement(), service.getAndIncrement()];
    expect(ids).toEqual([10, 11, 12]);
  });
});
