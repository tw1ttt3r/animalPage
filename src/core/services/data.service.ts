import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AnimalData from '../types/animalData.type';
import ItemMeta from '../types/itemMeta.type';
import PageMeta from '../types/pageMeta.type';
import SectionPageMeta from '../types/sectionPageMeta.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getReportItemMeta() {
    return this.http.get< ItemMeta[] >(`https://bovisync.bitbucket.io/sample_data/item_meta.json`);     
  }

  getAnimalData() {
    return this.http.get< AnimalData >(`https://bovisync.bitbucket.io/sample_data/animal_data.json`);
  }
  
  getPageMetaData() {
    return this.http.get<SectionPageMeta>(`https://bovisync.bitbucket.io/sample_data/page_meta.json`);
  }
}
