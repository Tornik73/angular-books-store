import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminToolsService } from '../services/admin-tools.service';
import { RequestsService } from '../services/requests.service';
import { ExtensionsService } from '../services/extensions.service';

export interface DialogData {
  id: number;
  email: string;
}

@Component({
  selector: 'app-add-user-data',
  templateUrl: './add-user-data.component.html',
  styleUrls: ['./add-user-data.component.css']
})
export class DialogDataAdd implements OnInit {
  angForm: FormGroup;
  public email: string;
  public password: string;
  public age: number;
  public telephone: string;
  img: string = this.extensionServ.defaultUserImg;

  constructor(public dialogRef: MatDialogRef<DialogDataAdd>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastrService: ToastrService,
    private adminService: AdminToolsService,
    private requestServ: RequestsService,
    private extensionServ: ExtensionsService) { }

  ngOnInit() {
    this.angForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      age: new FormControl(this.age, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.telephone, [Validators.required])
    });
  }

  successRegistration() {
    this.toastrService.success('added new user', 'Success');
  }

  onSubmit() {
    this.angForm.value.img = this.img;
    
    this.requestServ.httpPOST(this.angForm.value, "users")
      .then(data => {
        this.successRegistration();
        this.adminService.upload(this.angForm.value)
      }).then(()=>{
        // close modal window добавить
      })
  }
}