import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article, ArticleService } from '../../core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {}

  //Capture articleID from URL and request matching article
  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    
    this.articleService.get(Number(articleId))
      .subscribe( rawArticle => {
          this.article = new Article(rawArticle);
        }, err => {
          //On error: Navigate back to the overview
          this.router.navigate(['/article-overview']);
        }
      );
  }
}