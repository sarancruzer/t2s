import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList: any;
  storeList: any;
  customerName = '';
  @ViewChild('createCustomerModal') public createCustomerModal: ModalDirective;

  submitAttempt = false;
  createCustomerForm: FormGroup;
  submitCustomerForm: FormGroup;
  customerId: string | number;
  constructor(
    private customerService: CustomerService,
    private storeService: StoreService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initCreateHomeworkForm();
    this.getCustomerList();
    this.getStoreList();
  }

  getCustomerList() {
    const params = {
      customerName: this.customerName
    };
    this.customerService.getCustomerList(params).subscribe(res => {
      this.customerList = res.data;
    },
      err => {
        console.log('error msg');
        console.log(err);
      });
  }

  getStoreList() {
    this.storeService.getStoreData().subscribe(res => {
      this.storeList = res.data;
    },
      err => {
        console.log('error msg');
        console.log(err);
      });
  }

  searchEvent($event: any) {
  if ($event.keyCode === 13) {
      this.getCustomerList();
    }
  }

  initCreateHomeworkForm() {
    this.createCustomerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      store: ['', Validators.required]
    });
  }

  openCreateCustomerModal() {
    this.createCustomerModal.show();
  }

  createCustomer() {
    this.submitAttempt = true;
    if (this.createCustomerForm.valid) {
      this.customerService.createCustomer(this.createCustomerForm.value).subscribe(res => {
        const homework = res.data;
        this.createCustomerModal.hide();
        this.createCustomerForm.reset();
        this.submitAttempt = false;
        this.getCustomerList();
      },
        err => {
          console.log('error msg');
          console.log(err);
        });
    }

  }

}
