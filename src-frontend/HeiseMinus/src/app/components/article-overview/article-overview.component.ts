import { Component, OnInit } from '@angular/core';

import {
  Article,
  ArticleService
} from '../../core'

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.css']
})
export class ArticleOverviewComponent implements OnInit {
  articles: Article[];

  /** 
   * First we fetch all articles from the server, then we parse the raw data to match our local model. 
   * Not really happy with this, since we parse API data in the view model, but I haven't found a more
   * appropriate solution since the ArticleService returns an Observable<Article[]>, whose subscribe() 
   * lambda parameters are apparently not cast to Article[] (by calling the constructor).
   */
  constructor(private articleService: ArticleService) { 
    articleService.getAll()
      .subscribe(fetchedArticles => {
        this.articles = fetchedArticles.map(rawArticle => new Article(rawArticle));
      });
  }

  /**
   * Removes an article both from the components internal state as well as the server.
   * 
   * @param article The article to be removed
   */
  removeArticle(article: Article) {
    this.articleService.delete(article.id)
      .subscribe( _ =>
        //Fetch articles from the server again to ensure local state matches server state
        this.articleService.getAll()
          .subscribe(fetchedArticles => {
            this.articles = fetchedArticles.map(rawArticle => new Article(rawArticle));
          })
      );
  }

  ngOnInit(): void {}

}
