import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleOverviewComponent } from './components/article-overview/article-overview.component';
import { CoreModule } from './core/core.module';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    ArticleOverviewComponent,
    TitlebarComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
