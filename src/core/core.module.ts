import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataComponent } from './components/data/data.component';



@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [DataComponent]
})
export class CoreModule { }
