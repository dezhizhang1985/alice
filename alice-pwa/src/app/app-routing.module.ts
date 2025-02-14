import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './components/pages/check-in/check-in.component';
import { DiarioComponent } from './components/pages/diario/diario.component';
import { MappaComponent } from './components/pages/mappa/mappa.component';
import { BadgeComponent } from './components/pages/badge/badge.component';
import { TellStoryComponent } from './components/pages/tell-story/tell-story.component';
import { SvgMapComponent } from './components/pages/svg-map/svg-map.component';


const routes: Routes = [
  {path: '', component: CheckInComponent},
  {path: 'diario', component: DiarioComponent},
  {path: 'mappa', component: MappaComponent},
  {path: 'biblioteca', component: SvgMapComponent},
  {path: 'badge', component: BadgeComponent},
  {path: ':key/story', component: TellStoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
