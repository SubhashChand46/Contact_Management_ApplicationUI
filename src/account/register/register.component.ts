import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/Service/contact.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;


  constructor(private fb: FormBuilder, private service: ContactService, private toastr: ToastrService, public router: Router) {

  }
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      id: [0],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }
  isSubmit: boolean = false;
  onSubmit() {
    let rq = this.registerForm.getRawValue();
    if (this.registerForm.invalid) {
      this.isSubmit = true;
      this.toastr.error('Please fill required details !', 'Error');
    }
    else if (rq.password != rq.confirmpassword) {
      this.toastr.info('Password and confirm password are not matching !', 'Info');
    }
    else {
      this.isSubmit = false;
      this.service.register(rq).subscribe((res: any) => {
        if (res.status == 1) {
          sessionStorage.clear();
          this.router.navigate(['/account/login']);
          this.toastr.success(res.message, 'Success');
        }
        else {
          this.toastr.error(res.message, 'Error');
        }
      });
    }
  }
}
