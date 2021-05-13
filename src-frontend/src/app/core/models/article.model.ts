import { DatePipe } from '@angular/common';

export class Article {
    id: Number;
    title: string;
    content: string;
    createdAt: Date;
    //These are seperated so we don't have to call Date functions to retrieve the time and date seperately on every render
    createdAtTime: string;
    createdAtDate: string;

    constructor(rawArticle) {
        let rawDate = new Date(rawArticle.createdAt);
        let datePipe = new DatePipe("de_DE");
        let transformedTime = datePipe.transform(rawDate, 'HH:mm');
        let transformedDate = datePipe.transform(rawDate, 'dd.MM.YYYY');
        return {
            id: rawArticle.id,
            title: rawArticle.title,
            content: rawArticle.content,
            createdAt: rawDate,
            createdAtTime: transformedTime,
            createdAtDate: transformedDate
        } as Article
    }
}
