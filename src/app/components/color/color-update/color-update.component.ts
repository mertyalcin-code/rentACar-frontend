import { ColorListModel } from 'src/app/models/listModels/colorListModel';
import { SingleResponseModel } from '../../../models/responseModels/singleResponseModel';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../../services/color.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UpdateColorModel } from 'src/app/models/updateModels/updateColorModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  //variables
  loading: boolean = false;
  editColor: ColorListModel;
  //constructor
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: ActivatedRoute
  ) {}
  //starter
  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id')));
  }
  //update form
  colorUpdateForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });
  //clear form
  clearColorUpdateForm() {
    this.colorUpdateForm.patchValue({
      name: '',
    });
  }
  //finds color by id and patches the value to the add form
  findById(id: number) {
    this.colorService.findById(id).subscribe(
      (response: SingleResponseModel<ColorListModel>) => {
        if (response.success) {
          this.editColor = response.data;
          this.colorUpdateForm.patchValue({
            name: response.data.name,
          });
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
      }
    );
  }
  //sends update request
  update() {
    this.loading = true;
    let colorModel: UpdateColorModel = Object.assign(
      {},
      this.colorUpdateForm.value
    );
    colorModel.id = this.editColor.id;
    this.colorService.update(colorModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.loading = false;
          this.clearColorUpdateForm();
          this.colorUpdateForm.markAsUntouched();
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.loading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.loading = false;
      }
    );
  }
}
