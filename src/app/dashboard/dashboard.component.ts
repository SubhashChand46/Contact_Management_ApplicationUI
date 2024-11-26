import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/Service/contact.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountInfo: any;
  @ViewChild('addContactModal') addContactModal!: ElementRef;
  contactForm!: FormGroup;
  contacts: any = [];
  idCounter = 1;
  showPopup: boolean = false;
  contactData: Array<any> = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  sortColumn = '';
  modalRef!: NgbModalRef;
  contactTitle: string = "Add New Contact";
  sortDirection: 'asc' | 'desc' = 'asc';
  paginatedContacts: any = [];
  sortedData: any;
  constructor(private fb: FormBuilder, private service: ContactService, private modalService: NgbModal, private toastr: ToastrService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.buildForm();
    this.getContactLst();
  }

  buildForm() {
    this.contactForm = this.fb.group({
      id: ['0'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  }

  getContactLst() {
    this.service.getContactData().subscribe((res: any) => {
      if (res) {
        this.contactData = res;
        this.sortedData = [...this.contactData];
        this.totalPages = Math.ceil(this.contactData.length / this.pageSize);
        this.updatePagination();
      }
    })
  }

  openAddContactModal(content: any) {
    this.contactTitle = "Add New Contact";
    this.modalService.open(content);
  }

  deleteContact(id: number, contact: any) {
    if (window.confirm('Are you sure you want to submit this contact?')) {
      this.service.deleteContact(id).subscribe((res: any) => {
        if (res.status == 1) {
          this.getContactLst();
          this.toastr.success(res.message, 'Success');
        }
        else {
          this.toastr.error('An error occurred!', 'Error');
        }
      })
    }
  }
  contactInfo: any = {};
  edit(data: any, content: any) {
    this.contactTitle = "Update Contact";
    this.contactInfo = data;
    this.contactForm.reset();
    this.contactForm.patchValue(data);
    this.modalService.open(content);
  }

  changePage(direction: number) {
    this.currentPage += direction;
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.sortedData = this.sortData([...this.contactData]);
    this.paginatedContacts = this.sortedData.slice(start, end);
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updatePagination();
  }

  getSortClass(column: string) {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
    }
    return '';
  }

  sortData(data: any[]) {
    if (!this.sortColumn) return data;
    return data.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  closeModal(ev: any) {
    if (this.contactForm) {
      this.contactForm.reset();
    }
    this.getContactLst();
    this.modalService.dismissAll();
  }
  
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/account/login']);
  }
}
