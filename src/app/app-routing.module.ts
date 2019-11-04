import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BookingHistoryPage } from './pages/booking-history/booking-history.page';
import { PaymentHistoryPage } from './pages/payment-history/payment-history.page';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { BookingStatusComponent } from './components/booking-status/booking-status.component';

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
  { path: 'course-list/:id', loadChildren: './pages/course-list/course-list.module#CourseListPageModule' },  
  { path: 'course-filter-modal', loadChildren: './modal/course-filter-modal/course-filter-modal.module#CourseFilterModalPageModule' },
  { path: 'course-detail/:id', loadChildren: './pages/course-detail/course-detail.module#CourseDetailPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login/:courseId', loadChildren: './pages/login/login.module#LoginPageModule' },  //when user navigate from course detail page when he is not loggedin or register
  { path: 'booking-history',
   component : BookingHistoryPage ,
  children: [
    {
      path: 'new',
      component : BookingStatusComponent
    },
    {
      path: 'in_progress',
      component : BookingStatusComponent
    },
    {
      path: 'completed',
      component : BookingStatusComponent
    },
    
    {
      path: '',
      redirectTo: 'new',
      pathMatch: 'full'
    }
  ]  
},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'register/:courseId', loadChildren: './pages/register/register.module#RegisterPageModule' },  //when user navigate from course detail page when he is not loggedin or register
  { path: 'payment-history',
  component : PaymentHistoryPage,
  children: [
    {
      path: 'pending',
     component : PaymentStatusComponent
    },
    {
      path: 'approved',
      component : PaymentStatusComponent
    },
    {
      path: 'rejected',
      component : PaymentStatusComponent
    },
    
    {
      path: '',
      redirectTo: 'pending',
      pathMatch: 'full'
    }
  ] 
 },
  { path: 'booking-confirmation/:course-id', loadChildren: './pages/booking-confirmation/booking-confirmation.module#BookingConfirmationPageModule' },
  { path: 'chat/:userId', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'chat-list', loadChildren: './pages/chat/chat-list/chat-list.module#ChatListPageModule' },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
