import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateDialogComponent } from '@components/dialog/create/create-dialog.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { UpdateDialogComponent } from '@components/dialog/update/update-dialog.component';
import { TableComponent } from '@components/table/table.component';
import { MaterialModule } from '@modules/material.module';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchComponent } from './components/search/search.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';
import { DeleteDialogComponent } from '@components/dialog/delete/delete-dialog.component';
import { NoRegisterComponent } from './components/no-register/no-register.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    NavBarComponent,
    CreateDialogComponent,
    UpdateDialogComponent,
    TableComponent,
    FiltersComponent,
    SearchComponent,
    PaginatorComponent,
    MainComponent,
    SortableColumnComponent,
    NoRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskPipe,
    NgxMaskDirective,
    AppRoutingModule
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
