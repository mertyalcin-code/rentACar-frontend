import { HttpErrorResponse } from '@angular/common/http';
import { SingleResponseModel } from './../../../models/responseModels/singleResponseModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SegmentService } from './../../../services/segment.service';
import { SegmentListModel } from 'src/app/models/listModels/segmentListModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { UpdateSegmentModel } from './../../../models/updateModels/updateSegmentModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-segment-update',
  templateUrl: './segment-update.component.html',
  styleUrls: ['./segment-update.component.css'],
})
export class SegmentUpdateComponent implements OnInit {
  //variables
  loading: boolean = false;
  editSegment: SegmentListModel;
  //constructor
  constructor(
    private segmentService: SegmentService,
    private toastrService: ToastrService,
    private router: ActivatedRoute
  ) {}
  //starter
  ngOnInit() {
    this.findById(parseInt(this.router.snapshot.paramMap.get('id')));
  }
  //update form
  segmentUpdateForm = new FormGroup({
    segmentName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
    ]),
  });
  //clear segment form
  clearsegmentUpdateForm() {
    this.segmentUpdateForm.patchValue({
      segmentName: '',
    });
  }
  //finds segment by id and patches value to the update form
  findById(id: number) {
    this.segmentService.findById(id).subscribe(
      (response: SingleResponseModel<SegmentListModel>) => {
        if (response.success) {
          this.editSegment = response.data;
          this.segmentUpdateForm.patchValue({
            name: response.data.segmentName,
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
  //sends update for segment
  update() {
    this.loading = true;
    let segmentModel: UpdateSegmentModel = Object.assign(
      {},
      this.segmentUpdateForm.value
    );
    segmentModel.id = this.editSegment.id;
    this.segmentService.update(segmentModel).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          this.loading = false;
          this.clearsegmentUpdateForm();
          this.segmentUpdateForm.markAsUntouched();
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
