import { BrandService } from './../../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  //variables  
  loading = false;
  //constructor
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService) { }
  //starter
  ngOnInit() {
  }
  //add Form
  brandAddForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)])
  })
  // clear Form
  clearBrandAddForm() {
    this.brandAddForm.patchValue({
      name: '',

    });
  }
  // sends request to add new brand
  add() {
    this.loading = true;
    let brandModel = Object.assign({}, this.brandAddForm.value);
    this.brandService.add(brandModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          console.log(response)
          this.loading = false;
          this.clearBrandAddForm();
          this.brandAddForm.markAsUntouched();
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