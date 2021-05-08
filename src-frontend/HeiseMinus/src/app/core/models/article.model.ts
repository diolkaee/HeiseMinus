export class Article {
    id: Number;
    title: string;
    content: string;
    //These are seperated so we don't have to call Date functions to retrieve the time and date seperately on every render
    createdAtTime: string;
    createdAtDate: string;

    constructor(rawArticle) {
        let rawDate = new Date(rawArticle.createdAt);
        return {
            id: rawArticle.id,
            title: rawArticle.title,
            content: rawArticle.content,
            createdAtTime: `${rawDate.getHours()}:${rawDate.getMinutes()}`,
            createdAtDate: `${rawDate.getDate()}.${rawDate.getMonth() + 1}.${rawDate.getFullYear()}`
        } as Article
    }
}
