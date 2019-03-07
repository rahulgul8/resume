import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialsModule } from './modules/mateirals.module';
import { TextElementComponent } from './components/text-element/text-element.component';
import { PaperComponent } from './components/paper/paper.component';
import { FormsModule } from '@angular/forms';
import { ElementComponent } from './components/element/element.component';
import { BulletElementComponent } from './components/bullet-element/bullet-element.component';
import { SubHeadingDirective } from './directives/sub.heading.directive';
import { HeadingDirective } from './directives/heading.directive';
import { PopoverDirective } from './directives/popover.directive';
import { TemplateComponent } from './components/template/template.component';
import { PopoverComponent } from './components/popover/popover.component';
import { TooltipComponent } from './modules/tooltip/tooltip.component';
import { TooltipDirective } from './modules/tooltip/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    TextElementComponent,
    PaperComponent,
    ElementComponent,
    BulletElementComponent,
    SubHeadingDirective,
    HeadingDirective,
    PopoverDirective,
    TemplateComponent,
    PopoverComponent,
    TooltipComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialsModule,
    FormsModule,

  ],
  providers: [],
  entryComponents: [PopoverComponent, TooltipComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
