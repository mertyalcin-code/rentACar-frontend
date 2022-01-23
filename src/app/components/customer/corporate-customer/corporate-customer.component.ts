import { CorporateCustomerService } from './../../../services/corporate-customer.service';
import { ListResponseModel } from './../../../models/responseModels/listResponseModel';
import { ColorService } from './../../../services/color.service';
import { ToastrService } from 'ngx-toastr';
import { ColorListModel } from './../../../models/listModels/colorListModel';
import { ResponseModel } from './../../../models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CorporateCustomerListModel } from 'src/app/models/listModels/corporateCustomerListModel';

@Component({
  selector: 'app-corporate-customer',
  templateUrl: './corporate-customer.component.html',
  styleUrls: ['./corporate-customer.component.css']
})
export class CorporateCustomerComponent implements OnInit {


  customers: CorporateCustomerListModel[] = [];
  customerLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  constructor(private corporateCustomerService: CorporateCustomerService,

    private toastrService: ToastrService

  ) { }
  ngOnInit(): void {
    this.findAll();
  }
  findAll() {
    this.customerLoading = true;
    this.corporateCustomerService.findAll().subscribe(
      (response: ListResponseModel<CorporateCustomerListModel>) => {
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
    this.corporateCustomerService.delete(id).subscribe(
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
