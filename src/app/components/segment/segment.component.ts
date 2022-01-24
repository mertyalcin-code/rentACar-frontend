import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { ListResponseModel } from './../../models/responseModels/listResponseModel';
import { ToastrService } from 'ngx-toastr';
import { SegmentService } from './../../services/segment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SegmentListModel } from 'src/app/models/listModels/segmentListModel';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css'],
})
export class SegmentComponent implements OnInit {
  //variables
  segments: SegmentListModel[] = [];
  segmentsLoading: boolean = false;
  deleteLoading = false;
  searchTerm: string = '';
  //constructor
  constructor(
    private segmentService: SegmentService,
    private toastrService: ToastrService
  ) {}
  //starters
  ngOnInit(): void {
    this.findAll();
  }
  //finds all segments
  findAll() {
    this.segmentsLoading = true;
    this.segmentService.findAll().subscribe(
      (response: ListResponseModel<SegmentListModel>) => {
        if (response.success) {
          this.segmentsLoading = false;
          this.segments = response.data;
          this.toastrService.success(response.message, 'Başarılı');
        } else {
          this.toastrService.warning(response.message, 'Başarısız');
          this.segmentsLoading = false;
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.error(errorResponse.message, 'Başarısız');
        this.segmentsLoading = false;
      }
    );
  }
  //deletes a segment if there is no relation
  delete(id: number) {
    this.deleteLoading = true;
    this.segmentService.delete(id).subscribe(
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
