import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from './../services/auth.service';
import { TelephoneBookService } from '../services/telephone-book.service';

import { HomeNewComponent } from './home-new/home-new.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formSearch: FormGroup;
  timeout;
  params;
  contacts;

  constructor(
    private authService: AuthService,
    private telephoneBookService: TelephoneBookService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.get();
    this.formSearch = this.formBuilder.group({
      value: ['', Validators.maxLength(10)]
    });
  }

  get(value = null) {
    this.params = {};

    if (value) {
      this.params = { name: value };
    }

    this.telephoneBookService.get(this.params).subscribe(
      (response) => (this.contacts = response),
      (error) => {
        console.log('error', error);
      }
    );
  }

  onSearchChange(value) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.get(value), 200);
  }

  openDialog(data = null) {
    const dialogRef = this.dialog.open(HomeNewComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.get();
    });
  }

  edit = (data) => this.openDialog(data);

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  delete(id) {
    this.telephoneBookService.delete(id).subscribe(
      () => {
        this.get();
        console.log('sucess', 'Contato removido com sucesso!');
      },
      (error) => console.log('error', error)
    );
  }
}
