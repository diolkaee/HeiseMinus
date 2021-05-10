import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article, ArticleService } from '../../core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    //Capture article ID from URL and request matching Article from ArticleService 
    const articleId = this.route.snapshot.paramMap.get('id');
      
    //If the URL contains no ID param, navigate back to the overview (TODO: or an error page?)
    if(articleId == null)
      this.router.navigate(['/article-overview']);

    this.articleService.get(Number(articleId))
      .subscribe(article => {
        this.article = article;
      });
  }
}
