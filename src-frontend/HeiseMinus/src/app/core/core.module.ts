import { NgModule } from '@angular/core';
import { ApiService, ArticleService } from './services';

@NgModule({
    providers: [
        ApiService,
        ArticleService
    ]
})

export class CoreModule {}