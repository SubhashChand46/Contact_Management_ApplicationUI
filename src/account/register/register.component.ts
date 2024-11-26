import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/Service/contact.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  
  constructor(private fb: FormBuilder, private service: ContactService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      id: [0],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    debugger
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill required details !', 'Error');
    }
    let rq = this.registerForm.getRawValue();
    this.service.register(rq).subscribe((res: any) => {
      if (res.status == 1) {
        sessionStorage.clear();
        this.toastr.success(res.message, 'Success');
      }
      else {
        this.toastr.error(res.message, 'Error');
      }
    })
  }
}
