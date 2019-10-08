import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forTest';
  form: FormGroup;
  fileArray: File[];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      files: this.fb.array([]),
      fields: this.fb.array([])
    });
  }

  ngOnInit(): void {
  }

  get fields() {
    return this.form.get('fields') as FormArray;
  }

  get files() {
    return this.form.get('files') as FormArray;
  }

  addFields(num?: number) {
    if (num) {
      // Math.abs(num);
      for (let i = 0; i < num; i++) {
        console.log(i);
        this.fields.push(this.fb.group({
          column_title_name: '',
          column_content_name: '',
          column_date_name: '',
          column_url_name: '',
        }));
      }
    } else {
      this.fields.push(this.fb.group({
        column_title_name: '',
        column_content_name: '',
        column_date_name: '',
        column_url_name: '',
      }));
    }
  }

  selectFiles(event): void {
    this.fileArray = event.target.files;
    if (this.fileArray.length <= this.fields.length) {
      this.fields.clear();
    }

    this.addFields(this.fileArray.length - this.fields.length);
  }

  sendData() {
    Array.from(this.fileArray).forEach(file => {
      this.files.push(this.fb.group({
        file
      }));
    });
    console.log(this.form.value);
  }

  isEqualFilesToFields(): boolean {
    if (!this.fileArray) {
      return;
    }
    return this.fileArray.length !== this.fields.length;
  }
}
