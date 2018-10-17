import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { TelephoneBookService } from './../../services/telephone-book.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.css']
})
export class HomeNewComponent implements OnInit {
  form: FormGroup;
  title = 'Cadastrar Contato';

  typesPhone = ['Móvel', 'Fixo', 'Outro'];
  typesEmail = ['Pessoal', 'Trabalho', 'Outro'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HomeNewComponent>,
    private telephoneBookService: TelephoneBookService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      _id: [undefined],
      name: [undefined, [Validators.required]],
      phones: this.formBuilder.array([]),
      emails: this.formBuilder.array([]),
      company: [undefined],
      office: [undefined]
    });

    if (this.data) {
      this.title = 'Editar Contato';
      this.setValue();
    }

    this.addControl('phones');
    this.addControl('emails');
  }

  setValue() {
    this.form.patchValue({
      _id: this.data._id,
      name: this.data.name,
      company: this.data.company,
      office: this.data.office
    });

    this.data.phones.map((phone) => this.addControl('phones', phone.type, phone.value));
    this.data.emails.map((email) => this.addControl('emails', email.type, email.value));
  }

  createControl = (type, value): FormGroup => this.formBuilder.group({ type, value });

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.form.get('_id').value) {
      this.telephoneBookService.edit(this.form.value).subscribe(
        () => {
          this.close();
          console.log('sucess', 'Contato editado com sucesso!');
        },
        (error) => console.log('error', error)
      );
    } else {
      this.telephoneBookService.create(this.form.value).subscribe(
        () => {
          this.close();
          console.log('sucess', 'Contato criado com sucesso!');
        },
        (error) => console.log('error', error)
      );
    }
  }

  close = () => this.dialogRef.close();

  addControl(controlName, type = 'Outro', value = '') {
    const controls = <FormArray>this.form.controls[controlName];
    controls.push(this.createControl(type, value));
  }

  deleteControl(index, controlName) {
    const control = <FormArray>this.form.controls[controlName];
    control.removeAt(index);
  }
}
