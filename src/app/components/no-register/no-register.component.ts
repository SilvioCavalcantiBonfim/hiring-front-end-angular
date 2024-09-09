import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-no-register',
  templateUrl: './no-register.component.html'
})
export class NoRegisterComponent {
  @HostBinding('class')
  clazz = 'no-register';
}
