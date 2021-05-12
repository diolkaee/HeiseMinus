import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from 'src/app/core';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html'
})
export class ArticleFormComponent {
  form: FormGroup
  title: string

  constructor(private dialogRef: MatDialogRef<ArticleFormComponent>, @Inject(MAT_DIALOG_DATA) public article: Article) {
    this.title = article ? 'Edit' : 'Create';

    this.form = new FormGroup({
      id: new FormControl(this.article?.id),
      title: new FormControl(this.article?.title, [Validators.required]),
      content: new FormControl(this.article?.content, [Validators.required])
    });
  }

  /**
   * If the form is valid, close this dialog and return the form to parent
   */
  onSubmit() {
    //Close dialog only if the form is valid and signal a successful creation
    if(this.form.valid)
      this.dialogRef.close(this.form.value);
    
  }

  /**
   * Close this dialog and discard the form
   */
  onClose() {
    this.dialogRef.close();
  }
}