import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/core/services/data.service';
import ItemMeta from 'src/core/types/itemMeta.type';
import PageMeta from 'src/core/types/pageMeta.type';
import StructureData from 'src/core/types/StructureData.type';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {

  structureData: StructureData[] = [];
  itemMetaData: ItemMeta[] = [];
  destroy$ = new Subject();
  activeDescription: string = '-1';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    combineLatest([
      this.dataService.getReportItemMeta(),
      this.dataService.getPageMetaData(),
      this.dataService.getAnimalData()
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe( ([ itemMetaData, pageMetaData, animalData ]: any[]) => {
      this.itemMetaData = itemMetaData;
      this.structureData = pageMetaData.sections.reduce( (previous: any[], current: PageMeta) => {
        const body = current.items.map( (dataItem: string) => ({data: !!animalData[dataItem] ? animalData[dataItem] : 'No Data', ...this.getNameItemData(dataItem)}) );
        return [ ...previous, { label: current.label, body } ];
      }, []);
    });
  }

  getNameItemData(item: string) {
    const itemData = this.itemMetaData.filter( (itemMeta: any) => itemMeta.shortName === item )[0];
    return !!itemData
      ? { id: itemData.shortName, name: itemData.name, description: itemData.description, unit: !!itemData ? !!itemData.units ? itemData.units : '' : '' }
      : { id: '', name: 'Header not Found', description: 'No description found', unit: '' };
  }

  getClue(id: string) {
    this.activeDescription = id === this.activeDescription ? '-1' : id;
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
