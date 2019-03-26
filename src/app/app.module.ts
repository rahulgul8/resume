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
import { DisabledDirective } from './directives/disabled.directive';
import { ShadowComponent } from './components/shadow/shadow.component';
import { FormatterDirective } from './directives/formatter.directive';
import { FocusDirective } from './directives/focus.directive';
import { DestroyerDirective } from './directives/structural/destroyer.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { PaperstemplateComponent } from './components/paperstemplate/paperstemplate.component';
import { ChipDirective } from './directives/chip.directive';
import { DialogDirective } from './directives/dialog.directive';
import { ThemeDirective } from './directives/theme.directive';
import { SceneComponent } from './template/scene/scene.component';
import { ChipgroupComponent } from './components/chipgroup/chipgroup.component';
import { ResumeTestComponent } from './template/resume-test/resume-test.component';
import { ChiptoggleComponent } from './components/chiptoggle/chiptoggle.component';
import { ContenteditableModel } from './directives/contenteditable.directive';
import { DescriptionComponent } from './components/description/description.component';
import { ClassInjector } from './directives/classinjector.directive';
import { FirstUppercasePipe } from './pipes/first-uppercase.pipe';

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
    DisabledDirective,
    ShadowComponent,
    FormatterDirective,
    FocusDirective,
    DestroyerDirective,
    DialogComponent,
    PaperstemplateComponent,
    ChipDirective,
    DialogDirective,
    ThemeDirective,
    SceneComponent,
    ChipgroupComponent,
    ResumeTestComponent,
    ChiptoggleComponent,
    ContenteditableModel,
    DescriptionComponent,
    ClassInjector,
    FirstUppercasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialsModule,
    FormsModule,
  ],
  providers: [],
  entryComponents: [PopoverComponent,ShadowComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
