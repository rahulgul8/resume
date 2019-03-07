import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
//https://www.npmjs.com/package/ng2-tooltip-directive
@NgModule({
    declarations: [
        TooltipDirective,
        TooltipComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TooltipDirective
    ],
    entryComponents: [
        TooltipComponent
    ]
})
export class TooltipModule { }
