import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { Article } from "../models"

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Article[]> {
        return this.http.get(`${environment.articlesEndpoint}`) as Observable<Article[]>;
    }

    get(id: Number): Observable<Article> {
        return this.http.get(`${environment.articlesEndpoint}/${id}`) as Observable<Article>;
    }

    save(article): Observable<Article> {
        if(article.id)
            return this.http.put(`${environment.articlesEndpoint}/${article.id}`, JSON.stringify(article)) as Observable<Article>;
        else
            return this.http.post(`${environment.articlesEndpoint}`, JSON.stringify(article)) as Observable<Article>;
    }

    delete(id: Number): Observable<any> {
        console.log(`${environment.articlesEndpoint}/${id}`)
        if(id)
            return this.http.delete(`${environment.articlesEndpoint}/${id}`);
        else
            return this.http.delete(`${environment.articlesEndpoint}`);
    }
}