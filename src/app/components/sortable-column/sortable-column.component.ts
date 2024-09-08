import { Component, HostListener, Input } from '@angular/core';
import { SorterService } from '@services/sorter/sorter.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
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

  enabledIcon(): boolean{
    return this.columnName == this.shortedService.getColumn();
  }

  nameIcon(): string{
    return this.shortedService.getSort()? 'arrow_upward' : 'arrow_downward'
  }
}
