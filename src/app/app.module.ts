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

@NgModule({
  declarations: [
    AppComponent,
    TextElementComponent,
    PaperComponent,
    ElementComponent,
    BulletElementComponent,
    SubHeadingDirective,
    HeadingDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
