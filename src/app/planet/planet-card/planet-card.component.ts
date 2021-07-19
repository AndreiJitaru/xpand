import { Component, Input, OnInit } from '@angular/core';
import { PlanetStatus } from 'src/app/shared/constants/planet-status.constant';
import { Planet } from 'src/app/shared/interfaces/planet';

@Component({
    selector: 'app-planet-card',
    templateUrl: './planet-card.component.html',
    styleUrls: ['./planet-card.component.scss']
})
export class PlanetCardComponent implements OnInit {

    public statusColor = {} as any;
    @Input() planet: Planet | any;

    constructor() { }

    ngOnInit(): void {
        this.initColorStatuses();
    }

    private initColorStatuses(): void {
        this.statusColor[PlanetStatus.OK] = '#bcffa0';
        this.statusColor[PlanetStatus.NOT_OK] = '#cc9093';
        this.statusColor[PlanetStatus.EN_ROUTE] = '#bdbebe';
        this.statusColor[PlanetStatus.TO_DO] = 'Fdce63';
    }

}
