import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SegmentService } from './../../../services/segment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-segment-add',
  templateUrl: './segment-add.component.html',
  styleUrls: ['./segment-add.component.css'],
})
export class SegmentAddComponent implements OnInit {
  //variables
  loading = false;
  //constructor
  constructor(
    private segmentService: SegmentService,
    private toastrService: ToastrService
  ) {}
  //starter
  ngOnInit() {}
  //add form
  segmentAddForm = new FormGroup({
    segmentName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });
  //clears form
  clearSegmentAddForm() {
    this.segmentAddForm.patchValue({
      segmentName: '',
    });
  }
  //sends request to create a new segment
  add() {
    this.loading = true;
    let segmentModel = Object.assign({}, this.segmentAddForm.value);
    this.segmentService.add(segmentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          console.log(response);
          this.loading = false;
          this.clearSegmentAddForm();
          this.segmentAddForm.markAsUntouched();
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
