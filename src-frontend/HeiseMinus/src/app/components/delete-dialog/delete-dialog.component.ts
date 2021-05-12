import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent  {
  target = this.article ?  this.article.title : 'everything';

  constructor(@Inject(MAT_DIALOG_DATA) public article: Article) {}
}