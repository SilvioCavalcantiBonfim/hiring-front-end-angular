import { Component, HostListener, Input } from '@angular/core';
import { SorterService } from '@services/sorter.service';

@Component({
  selector: 'th[appTableSortableColumn]',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent {
  @Input()
  columnName!: string;

  constructor(private shortedService: SorterService){}

  @HostListener('click')
  onClick(): void{
    this.shortedService.setSort(this.columnName);
  }
}
