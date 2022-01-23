import { IndividualCustomerService } from './../../../services/individual-customer.service';
import { IndividualCustomerListModel } from './../../../models/listModels/individualCustomerListModel';
import { CorporateCustomerService } from '../../../services/corporate-customer.service';
import { ListResponseModel } from '../../../models/responseModels/listResponseModel';
import { ColorService } from '../../../services/color.service';
import { ToastrService } from 'ngx-toastr';
import { ColorListModel } from '../../../models/listModels/colorListModel';
import { ResponseModel } from '../../../models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CorporateCustomerListModel } from 'src/app/models/listModels/corporateCustomerListModel';

@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.css']
})
export class IndividualCustomerComponent implements OnInit {


  customers: IndividualCustomerListModel[] = [];
  customerLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  constructor(private individualCustomerService: IndividualCustomerService,

    private toastrService: ToastrService

  ) { }
  ngOnInit(): void {
    this.findAll();
  }
  findAll() {
    this.customerLoading = true;
    this.individualCustomerService.findAll().subscribe(
      (response: ListResponseModel<IndividualCustomerListModel>) => {
        if (response.success) {
          this.customerLoading = false;
          this.customers = response.data;
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
          this.customerLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");
        this.customerLoading = false;
      }
    )
  }
  delete(id: number) {
    this.deleteLoading = true;
    this.individualCustomerService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");
        this.deleteLoading = false;
      }
    )
  }

}
