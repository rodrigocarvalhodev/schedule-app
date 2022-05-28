import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

import { MatDialog } from '@angular/material/dialog';

import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { Contact } from './contact';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  form!: FormGroup
  contacts: Contact[] = [];
  displayedColumns: string[] = ['photo', 'id', 'name', 'email', 'favorite', 'delete']

  totalElements: number = 0
  page: number = 0
  size: number = 2
  pageSizeOptions: number[] = [2, 5, 10]

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
   }

  ngOnInit(): void {
    this.buildForm()
    this.list(this.page, this.size)
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required]
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ]
    })
  }

  save() {
    const formValue = this.form.value
    const contact = new Contact(formValue.name, formValue.email)
    this.contactService.save(contact)
          .subscribe(response => {
            this.list()
            this.snackbar.open('O contato foi adicionado.', 'Sucesso!', {
              duration: 2000
            })
            this.form.reset()
          }, error => {
            this.snackbar.open('Ocorreu um erro.', 'Erro', {
              duration: 10000
            })
          })
  }

  list(page: number = 0, size: number = 2) {
    this.contactService.getAll(page, size).
                    subscribe(response => { 
                      this.contacts = response.content
                      this.totalElements = response.totalElements
                      this.page = response.number
                    })
  }

  paginate(event: PageEvent) {
    this.page = event.pageIndex
    this.size = event.pageSize
    this.list(this.page, this.size)
  }

  favorite(event: { preventDefault: () => void; }, contact: Contact) {
    event.preventDefault()
    this.contactService.favorite(contact).subscribe(response => {
      contact.favorite = !contact.favorite
    })
  }

  delete(event: { preventDefault: () => void; }, contact: Contact) {
    event.preventDefault()
    this.contactService.deleteById(contact).subscribe(response => {
      this.list()
    })
  }

  uploadPhoto(event: any, contact: Contact) {
    event.preventDefault()
    const files = event.target.files
    if (files) {
      const photo: File = files[0]
      const formData: FormData = new FormData()
      formData.append("photo", photo);

      this.contactService.uploadPhoto(contact, formData)
                  .subscribe(response => {
                    this.list(this.page, this.size)
                  })
    }
  }

  viewContact(contact: Contact) {
    this.dialog.open(ContactDetailComponent, {
      width: '400px',
      height: '450px',
      data: contact
    })
  }
}