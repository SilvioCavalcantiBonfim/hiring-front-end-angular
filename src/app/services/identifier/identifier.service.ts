import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentifierService {

  private id = 0;

  getAndIncrement(): number{
    return this.id++;
  }

  set(init: number): void{
    this.id = init;
  }
}
