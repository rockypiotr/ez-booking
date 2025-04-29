import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../service/customer.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    FormsModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = true;
  error = false;
  globalFilter: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = false;

    this.customerService.getCustomersLarge().then(
      (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading customers', error);
        this.error = true;
        this.loading = false;
      }
    );
  }
}
