import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateDialogComponent } from '@components/create-dialog/create-dialog.component';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { NavBarComponent } from '@components/nav-bar/nav-bar.component';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { UpdateDialogComponent } from '@components/update-dialog/update-dialog.component';
import { TableComponent } from '@components/table/table.component';
import { MaterialModule } from '@modules/material.module';
import { FiltersComponent } from './components/filters/filters.component';
import { SearchComponent } from './components/search/search.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';

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
    SortableColumnComponent
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
