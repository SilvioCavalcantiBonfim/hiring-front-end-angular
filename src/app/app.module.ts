import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateDialogComponent } from '@components/create-dialog/create-dialog.component';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    NavBarComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
