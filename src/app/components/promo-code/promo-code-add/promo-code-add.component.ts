import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PromoCodeService } from './../../../services/promo-code.service';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo-code-add',
  templateUrl: './promo-code-add.component.html',
  styleUrls: ['./promo-code-add.component.css']
})
export class PromoCodeAddComponent implements OnInit {

  loading=false;
  constructor(
    private promoCodeService:PromoCodeService,private toastrService:ToastrService) { }
  ngOnInit() {
  }
  codeAddForm = new FormGroup({
    code: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    discountRate: new FormControl("",[Validators.required,Validators.min(0),Validators.max(1.01)]),
    startDate: new FormControl("",[Validators.required,]),
    endDate: new FormControl("",[Validators.required,]),
    description: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(255)])
  })
  clearCodeAddForm() {
    this.codeAddForm.patchValue({
      code: '',   
      discountRate: '',  
      startDate: '',  
      endDate: '',  
      description: '',  
    });
  }
  add(){
    this.loading = true;
    let codeModel = Object.assign({},this.codeAddForm.value);
    this.promoCodeService.add(codeModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.loading = false;
          this.clearCodeAddForm();
          this.codeAddForm.markAsUntouched();
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");
        this.loading = false;
      }
    )
   

  }
  
}