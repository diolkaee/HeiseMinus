import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Article } from "../models"
import { environment } from "../../../environments/environment";

const CONTENT_TYPE_HEADER = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<Article[]> {
        return this.http.get(`${environment.articlesEndpoint}`) as Observable<Article[]>;
    }

    get(id: Number): Observable<Article> {
        return this.http.get(`${environment.articlesEndpoint}/${id}`) as Observable<Article>;
    }

    save(article: Article): Observable<Article> {
        if(article.id)
            return this.http.put(`${environment.articlesEndpoint}/${article.id}`, JSON.stringify(article), { headers: CONTENT_TYPE_HEADER }) as Observable<Article>;
        else
            return this.http.post(`${environment.articlesEndpoint}`, JSON.stringify(article), { headers: CONTENT_TYPE_HEADER }) as Observable<Article>;
    }

    delete(id: Number): Observable<any> {
        if(id)
            return this.http.delete(`${environment.articlesEndpoint}/${id}`);
        else
            return this.http.delete(`${environment.articlesEndpoint}`);
    }
}