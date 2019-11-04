import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseDetailPage } from './course-detail.page';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
//import { DescriptionTabsComponent } from '../../components/description-tabs/description-tabs.component';

const routes: Routes = [
  {
    path: '',
    component: CourseDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CourseDetailPage],
  entryComponents : []
})
export class CourseDetailPageModule {}
