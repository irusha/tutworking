import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoViewComponent} from "../video-view/video-view.component";
import {HomeComponent} from "../home/home.component";

const routes: Routes = [
  {
    path: 'video', component: VideoViewComponent
  }, {
    path: '', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
