import { Component, OnInit } from '@angular/core';
import { Article } from '../../core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  constructor(private article: Article) { }

  ngOnInit(): void {
  }

}
