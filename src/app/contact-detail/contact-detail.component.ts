import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContactDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) { }

  ngOnInit(): void {
  }

  openDialog() {

  }

  close() {
    this.dialogRef.close()
  }
}