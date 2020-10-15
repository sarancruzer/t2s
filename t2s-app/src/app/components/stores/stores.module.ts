import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoreCreateComponent } from './store-create/store-create.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreListComponent } from './store-list/store-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StoreCreateComponent, StoreEditComponent, StoreListComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    FormsModule
  ]
})
export class StoresModule { }
