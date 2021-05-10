import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleOverviewComponent } from './components/article-overview/article-overview.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

const routes: Routes = [
  { path: 'article-overview', component: ArticleOverviewComponent},
  { path: 'article-detail/:id', component: ArticleDetailComponent},
  { path: '', redirectTo: '/article-overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
