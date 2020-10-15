import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  storeList: any;
  form: FormGroup;
  storeName = '';

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit(): void {
    this.getStoreList();
  }
  
  getStoreList() {
    const params = {
      storeName: this.storeName
    };
    this.storeService.getStoreList(params).subscribe(res => {
      this.storeList = res.data;
    },
      err => {
        console.log('error msg');
        console.log(err);
      });
  }

  searchStoreEvent($event: any) {
  if ($event.keyCode === 13) {
      this.getStoreList();
    }
  }


}
