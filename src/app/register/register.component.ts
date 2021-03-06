import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests.service';
import { ExtensionsService } from '../services/extensions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'Books||Lib';
  public email: string;
  public password: string;
  public age: number;
  public telephone: string;
  img: string = this.extensionServ.defaultUserImg;
  angForm: FormGroup;
  loadingDataSpinner = false;

  constructor(private toastrService: ToastrService,
              private router: Router,
              private requestServ: RequestsService,
              private extensionServ: ExtensionsService) {}

  successRegistration() {
    this.router.navigate(['/']);
    this.toastrService.success('for registration', 'Thank you');
  }

  ngOnInit() {
    this.angForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      age: new FormControl(this.age, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.telephone, [Validators.required])
    });
  }

  onSubmit() {
    this.angForm.value.img = this.img;
    this.loadingDataSpinner = true;
    this.requestServ.httpUsersPost(this.angForm.value)
    .subscribe(() => {
      setTimeout(() => {
        this.loadingDataSpinner = false;
        this.successRegistration();
      }, 3000);
    });
  }
}
