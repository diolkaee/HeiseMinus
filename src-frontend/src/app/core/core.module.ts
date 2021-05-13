import { NgModule } from '@angular/core';
import { ArticleService } from './services/article.service';

@NgModule({
    providers: [
        ArticleService
    ]
})

export class CoreModule {}