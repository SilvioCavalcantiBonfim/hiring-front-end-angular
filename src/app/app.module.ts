import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateDialogComponent } from '@components/create-dialog/create-dialog.component';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { UpdateDialogComponent } from '@components/update-dialog/update-dialog.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    NavBarComponent,
    CreateDialogComponent,
    UpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskPipe,
    NgxMaskDirective
  ],
  providers: [provideNgxMask(), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
