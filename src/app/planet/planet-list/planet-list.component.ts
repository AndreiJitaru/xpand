import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Planet } from 'src/app/shared/interfaces/planet';
import { PlanetService } from 'src/app/shared/services/planet.service';
import { PlanetFormComponent } from '../planet-form/planet-form.component';

@Component({
    selector: 'app-planet-list',
    templateUrl: './planet-list.component.html',
    styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {

    public planets: Planet[] = [];

    constructor(
        private dialog: MatDialog,
        private planetService: PlanetService
    ) { }

    ngOnInit(): void {
        this.planets = this.planetService.getPlanets();
    }

    public openEditPlanetDialog(planetId: string): void {
        this.dialog.open(PlanetFormComponent, {
            height: '500px',
            width: '700px',
            data: {
                planetId
            },
            disableClose: true,
            panelClass: 'no-padding-dialog-container'
        }).afterClosed()
            .subscribe((res: any) => {
                if (res.status === -1) {
                    return;
                }
                this.planetService.getPlanets();
            });
    }

}
