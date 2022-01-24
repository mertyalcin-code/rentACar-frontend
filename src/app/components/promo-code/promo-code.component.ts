import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { PromoCodeService } from './../../services/promo-code.service';
import { Component, OnInit } from '@angular/core';
import { PromoCodeListModel } from 'src/app/models/listModels/promoCodeListModel';

@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.css'],
})
export class PromoCodeComponent implements OnInit {
  //variables
  codes: PromoCodeListModel[] = [];
  codesLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  //constructor
  constructor(
    private promoCodeService: PromoCodeService,
    private toastrService: ToastrService
  ) {}
  //starter
  ngOnInit(): void {
    this.findAll();
  }
  //finds all promo codes
  findAll() {
    this.codesLoading = true;
    this.promoCodeService.findAll().subscribe(
      (response: ListResponseModel<PromoCodeListModel>) => {
        if (response.success) {
          this.codesLoading = false;
          this.codes = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.codesLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.codesLoading = false;
      }
    );
  }
  //deletes promo code if there is no relation in the database
  delete(id: number) {
    this.deleteLoading = true;
    this.promoCodeService.delete(id).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.deleteLoading = false;
          this.findAll();
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.deleteLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.deleteLoading = false;
      }
    );
  }
}
