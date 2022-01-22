import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { UpdatePromoCodeModel } from './../../../models/updateModels/updatePromoCodeModel';
import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { PromoCodeListModel } from './../../../models/listModels/promoCodeListModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PromoCodeService } from './../../../services/promo-code.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promo-code-update',
  templateUrl: './promo-code-update.component.html',
  styleUrls: ['./promo-code-update.component.css']
})
export class PromoCodeUpdateComponent implements OnInit {

  loading:boolean = false;
  editCode:PromoCodeListModel;
  constructor(private promoCodeService : PromoCodeService,
              private toastrService : ToastrService,
              private router : ActivatedRoute
    ) { }

  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id'))) ;  
  }
  codeUpdateForm = new FormGroup({
    code: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(30)]),
    discountRate: new FormControl("",[Validators.required,Validators.min(0),Validators.max(1.01)]),
    startDate: new FormControl("",[Validators.required,]),
    endDate: new FormControl("",[Validators.required,]),
    description: new FormControl("",[Validators.required,Validators.minLength(2),Validators.maxLength(255)])
  })
  clearCodeUpdateForm() {
    this.codeUpdateForm.patchValue({
      code: '',   
      discountRate: '',   
      startDate: '',   
      endDate: '',   
      description: '',   
    });
  }
  findById(id:number){
    this.promoCodeService.findById(id).subscribe(
      (response: SingleResponseModel<PromoCodeListModel>) => {
        if (response.success) {   
          this.editCode=response.data;
          this.codeUpdateForm.patchValue({
            code:response.data.code,   
            discountRate:response.data.discountRate, 
            startDate:response.data.startDate, 
            endDate:response.data.endDate, 
            description:response.data.description, 
          });
          this.toastrService.success(response.message,"Başarılı");
        } else {     
          this.toastrService.warning(response.message,"Başarısız");
        }
      },
      (errorResponse: HttpErrorResponse) => {       
        this.toastrService.error(errorResponse.message,"Başarısız");

      }
    )
  }
  
  update(){
    this.loading = true;
    let codeModel:UpdatePromoCodeModel = Object.assign({},this.codeUpdateForm.value);
    codeModel.id=this.editCode.id;
    this.promoCodeService.update(codeModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {           
          this.loading = false;
          this.clearCodeUpdateForm();
          this.codeUpdateForm.markAsUntouched();
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