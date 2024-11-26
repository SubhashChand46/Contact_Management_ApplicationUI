import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/Service/contact.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  userInfo: any = {};
  registerFlage: boolean = false
  loginForm!: FormGroup;
  username: string = "";
  password: string = "";
  constructor(private fb: FormBuilder, private service: ContactService, private toastr: ToastrService, public router: Router) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      id: [0],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  isSubmit: boolean = false;
  onSubmit() {
    if (this.loginForm.invalid) {
      this.isSubmit = true;
      this.toastr.error('Please fill required details !', 'Error');
    }
    let rq = this.loginForm.getRawValue();
    this.isSubmit = false;
    this.service.loginUser(rq).subscribe((res: any) => {
      if (res.status == 1) {
        sessionStorage.clear();
        sessionStorage.setItem('userData', JSON.stringify(res.token));
        this.router.navigate(['/app/dashboard']);
        this.toastr.success(res.message, 'Success');
      }
      else {
        this.toastr.error(res.message, 'Error');
      }
    })
  }


}