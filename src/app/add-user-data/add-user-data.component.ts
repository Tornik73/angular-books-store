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
  styleUrls: ['./add-user-data.component.scss']
})
export class DialogUserAddComponent implements OnInit {
  angForm: FormGroup;
  email: string;
  password: string;
  age: number;
  telephone: string;
  img: string = this.extensionServ.defaultUserImg;

  constructor(dialogRef: MatDialogRef<DialogUserAddComponent>,
              @Inject(MAT_DIALOG_DATA) data: DialogData,
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

  successRegistration(): void {
    this.toastrService.success('added new user', 'Success');
  }

  onSubmit(): void {
    this.angForm.value.img = this.img;

    this.requestServ.httpUsersPost(this.angForm.value)
      .subscribe(response => {
        this.successRegistration();
        this.adminService.upload(response);
      });
  }
}
