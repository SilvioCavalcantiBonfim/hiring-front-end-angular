import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateDialogComponent } from '@components/create-dialog/create-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Input()
  title!: string;

  constructor(private dialog: MatDialog){}

  onCreate(): void{
    this.dialog.open(CreateDialogComponent);
  }
}
