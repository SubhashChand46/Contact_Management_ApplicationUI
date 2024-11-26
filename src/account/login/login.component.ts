import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private service: ContactService, private toastr: ToastrService) {

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

  onSubmit() {
    debugger
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill required details !', 'Error');
    }
    let rq = this.loginForm.getRawValue();
    this.service.loginUser(rq).subscribe((res: any) => {
      if (res.status == 1) {
        sessionStorage.clear();
        sessionStorage.setItem('userData', JSON.stringify(res));
        this.toastr.success(res.message, 'Success');
      }
      else {
        this.toastr.error(res.message, 'Error');
      }
    })
  }


}