import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPagedDataView } from 'src/app/shared/view/IPagedDataView';
import { ILaboratoryView } from '../model/laboratory';
import { LaboratoryService } from '../service/laboratory.service';

@Component({  
  templateUrl: './laboratory-list.component.html',  
})
export class LaboratoryListComponent implements OnInit {
  constructor(    
    private router: Router,    
    private service : LaboratoryService
  ) {}

  ngOnInit(): void {        
    this.FillLaboratory();
}
  pageTitle: string = 'Laboratories';
  laboratories: ILaboratoryView[];
  errorMessage: string;

  FillLaboratory(){
    this.service.getLaboratories(0, 10).subscribe({
      next: (result) => {
        this.laboratories = result.data;
                  
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  addLaboratory() {
    this.router.navigate(['/laboratory']);
  }
  DeleteLaboratory(id)
  {
    if(confirm("Are you sure you want to delete laboratory?"))
    {
      this.service.DeleteLaboratory(id).subscribe(
        (response) => this.FillLaboratory(),
        (error) => (this.errorMessage = error)
      );
    }
  }
}
