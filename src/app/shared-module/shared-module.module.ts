import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysPipe } from '../pipes/days.pipe';

@NgModule({
  declarations: [DaysPipe],
  imports: [
    CommonModule
  ],
  exports : [DaysPipe]
})
export class SharedModuleModule { }
