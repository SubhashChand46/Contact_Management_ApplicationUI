import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/Service/contact.service';

@Component({
  selector: 'add-update-contact',
  templateUrl: './add-update-contact.component.html',
  styleUrls: ['./add-update-contact.component.css']
})
export class AddUpdateContactComponent {
  contactForm!: FormGroup;
  @Output() cancelMethod = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private service: ContactService, private modalService: NgbModal, private toastr: ToastrService) {
    this.buildForm()
  }
  @Input('contact') set setData(data: any) {
    if (data) {
      this.getData(data);
    }
  }
  ngOnInit(): void {

    // this.getContactLst();
  }
  buildForm() {
    this.contactForm = this.fb.group({
      id: ['0'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  getData(data: any) {
    this.contactForm.patchValue(data);
  }
  isSubmit: boolean = false;
  onSubmit() {
    if (this.contactForm.invalid) {
      this.isSubmit = true;
      this.toastr.error('Please fill required details !', 'Error');
    }
    else {
      this.isSubmit = false;
      let rq = this.contactForm.getRawValue();
      this.service.addUpdateContact(rq).subscribe((res: any) => {
        if (res.status == 1) {
          this.contactForm.reset();
          this.toastr.success(res.message, 'Success');
          this.cancelMethod.emit('');
        }
        else {
          this.toastr.error('An error occurred!', 'Error');
        }
      })
    }
  }
}
