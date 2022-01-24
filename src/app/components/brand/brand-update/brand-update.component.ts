import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { UpdateBrandModel } from './../../../models/updateModels/updateBrandModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { ColorService } from './../../../services/color.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../../services/brand.service';
import { BrandListModel } from './../../../models/listModels/brandListModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  //variables
  loading: boolean = false;
  editBrand: BrandListModel;
  //constructor
  constructor(private brandService: BrandService,
    private toastrService: ToastrService,
    private router: ActivatedRoute
  ) { }
  //starter
  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id')));
  }
  //update form
  brandUpdateForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
  })
  //clear form
  clearBrandUpdateForm() {
    this.brandUpdateForm.patchValue({
      name: '',
    });
  }
  //finds brand by id and patches the values to the update form
  findById(id: number) {
    this.brandService.findById(id).subscribe(
      (response: SingleResponseModel<BrandListModel>) => {
        if (response.success) {
          this.editBrand = response.data;
          this.brandUpdateForm.patchValue({
            name: response.data.name,
          });
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");

      }
    )
  }
  //update request
  update() {
    this.loading = true;
    let brandModel: UpdateBrandModel = Object.assign({}, this.brandUpdateForm.value);
    brandModel.id = this.editBrand.id;
    this.brandService.update(brandModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.loading = false;
          this.clearBrandUpdateForm();
          this.brandUpdateForm.markAsUntouched();
          this.toastrService.success(response.message, "Başarılı");
        } else {
          this.toastrService.warning(response.message, "Başarısız");
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, "Başarısız");
        this.loading = false;
      }
    )
  }




}