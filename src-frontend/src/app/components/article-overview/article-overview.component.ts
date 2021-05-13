import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import {
  Article,
  ArticleService
} from '../../core';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

const SNACKBAR_CONFIG = (duration: number, warn: Boolean): MatSnackBarConfig => {
  return {
    duration: duration * 1000,
    panelClass: ['mat-toolbar', warn ? 'mat-warn' : 'mat-primary']
  }
}

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.css']
})
export class ArticleOverviewComponent implements OnInit {
  articles: Article[];

  constructor(private articleService: ArticleService, private snackbar: MatSnackBar, public dialog: MatDialog) { 
    this.updateArticles();
  }

  /** 
   * Fetch all articles from the server and parse the raw data to match our local model. 
   * Not really happy with this, since we parse API data in the view model, but I haven't found a more
   * appropriate solution since the ArticleService returns an Observable<Article[]>, whose subscribe() 
   * lambda parameters are apparently not cast to Article[] (by calling the constructor).
   */
  private updateArticles() {
    this.articleService.getAll().subscribe( fetchedArticles => {
        this.articles = fetchedArticles.map(rawArticle => new Article(rawArticle));
      }, err => {
        this.snackbar.open(err.message, null, SNACKBAR_CONFIG(4, true));
      });
  }
  
  /**
   * Remove an article, signal the response status and update all articles.
   * 
   * @param article The article to be removed
   */
  onDelete(article: Article) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: article });

    //If the dialog returns a result, delete the article and reload all articles to ensure local state matches server state
    dialogRef.afterClosed().subscribe( result => {
      if(result)
        this.articleService.delete(article.id).subscribe( _ => {
          this.snackbar.open(`${article.title} deleted.`, null, SNACKBAR_CONFIG(2, false));
          this.updateArticles();
        }, err => {
          this.snackbar.open(err.message, null, SNACKBAR_CONFIG(4, true));
        }
    )});
  }

  /**
   * Delete all articles, signal the response status and update all articles
   */
  onNuke() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {});

    //If the dialog returns a result, delete the article and reload all articles to ensure local state matches server state
    dialogRef.afterClosed().subscribe( result => {
      if(result)
        this.articleService.delete(null).subscribe( _ => {
          this.snackbar.open(`Deleted everything.`, null, SNACKBAR_CONFIG(2, false));
          this.updateArticles();
        }, err => {
          this.snackbar.open(err.message, null, SNACKBAR_CONFIG(4, true));
        }
    )});
  }

  /**
   * Open an article in the editor and update the resource
   * @param article The article to be updated
   */
  onEdit(article: Article) {
    const dialogRef = this.dialog.open(ArticleFormComponent, 
      {
        data: article,
        autoFocus: true,
        width: '40%'
      }
    );

    dialogRef.afterClosed().subscribe( result => {
      if(result)
        this.articleService.save(result).subscribe( _ => {
          this.snackbar.open(`${article.title} saved.`, null, SNACKBAR_CONFIG(2, false));
          this.updateArticles();
        }, err => {
          this.snackbar.open(err.message, null, SNACKBAR_CONFIG(4, true))
        });
    });
  }

  /**
   * Open an empty article in the editor and create a resource
   */
  onCreate() {
    const dialogRef = this.dialog.open(ArticleFormComponent, { width: '40%' });

    dialogRef.afterClosed().subscribe( result => {
      if(result)
        this.articleService.save(result).subscribe( _ => {
          this.snackbar.open(`${result.title} created.`, null, SNACKBAR_CONFIG(2, false));
          this.updateArticles();
        }, err => {
          this.snackbar.open(err.message, null, SNACKBAR_CONFIG(4, true))
        });
    });
  }

  ngOnInit(): void {}
}