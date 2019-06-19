import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  { path: 'course-list', loadChildren: './pages/course-list/course-list.module#CourseListPageModule' },
  { path: 'course-filter-modal', loadChildren: './modal/course-filter-modal/course-filter-modal.module#CourseFilterModalPageModule' },
  { path: 'course-detail', loadChildren: './pages/course-detail/course-detail.module#CourseDetailPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
