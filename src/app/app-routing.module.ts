import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SceneComponent } from './template/scene/scene.component';
import { ResumeTestComponent } from './template/resume-test/resume-test.component';

const routes: Routes = [{ path: 'script', component: SceneComponent },
{ path: '', component: ResumeTestComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
