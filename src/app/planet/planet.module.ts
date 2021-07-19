import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetCardComponent } from './planet-card/planet-card.component';
import { PlanetFormComponent } from './planet-form/planet-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlanetListComponent,
    PlanetCardComponent,
    PlanetFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PlanetModule { }
