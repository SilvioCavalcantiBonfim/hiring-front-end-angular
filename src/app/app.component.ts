import { Component } from '@angular/core';
import { JsonCrudService } from './services/json-crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hiring-front-end-angular';

  constructor(protected JsonCrud: JsonCrudService){}
}
