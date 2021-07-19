import { Injectable } from '@angular/core';
import { PlanetStatus } from '../constants/planet-status.constant';
import { Planet } from '../interfaces/planet';

@Injectable({
    providedIn: 'root'
})
export class PlanetService {

    private planets: Planet[] = [
        {
            description: null,
            id: '1',
            imagePath: '../../assets/planet_1.png',
            name: 'Planet 1',
            status: PlanetStatus.TO_DO
        },
        {
            description: {
                captain: 'Jonathan Smartson',
                robots: ['T21', 'T88'],
                text: 'Planet 2 description'
            },
            id: '2',
            imagePath: '../../assets/planet_2.png',
            name: 'TAU 31',
            status: PlanetStatus.OK
        },
        {
            description: {
                captain: 'Eva Brains',
                robots: ['T44', 'S23'],
                text: '',
            },
            id: '3',
            imagePath: '../../assets/planet_3.png',
            name: 'TAU 23',
            status: PlanetStatus.EN_ROUTE
        },
        {
            description: {
                captain: 'Ken Adams',
                robots: ['T4', 'T10'],
                text: 'Planet 2 description'
            },
            id: '4',
            imagePath: '../../assets/planet_4.png',
            name: 'TAU 23',
            status: PlanetStatus.NOT_OK
        },
        {
            description: {
                captain: 'Regina Phalange',
                robots: ['T1'],
                text: 'Planet 2 description'
            },
            id: '5',
            imagePath: '../../assets/planet_5.png',
            name: 'TAU 23',
            status: PlanetStatus.OK
        },
        {
            description: {
                captain: 'Kristen Bell',
                robots: ['R2D2'],
                text: 'Planet 2 description'
            },
            id: '6',
            imagePath: '../../assets/planet_6.png',
            name: 'TAU 23',
            status: PlanetStatus.OK
        },
    ];

    constructor() { }

    public getPlanets(): Planet[] {
        return this.planets;
    }

    public getPlanetById(id: string): Planet | undefined {
        return this.planets.find((planet: Planet) => planet.id === id);
    }

    public getAllCaptains(): string[] {
        return ['Jonathan Smartson', 'Eva Brains', 'Ken Adams', 'Regina Phalange', 'Kristen Field'];
    }

    public getAllRobots(): string[] {
        return ['R2D2', 'T1', 'T4', 'T10', 'T44', 'S23', 'T21', 'T88'];
    }

    public updatePlanet(planetId: string, planetData: any): void {
        const updateItem = this.planets.find(planet => planet.id === planetId) as Planet;
        const index = this.planets.indexOf(updateItem);

        this.planets[index].description = planetData.description;
        this.planets[index].status = planetData.status;
    }

    public getPlanetStatuses(): string[] {
        return [PlanetStatus.EN_ROUTE, PlanetStatus.NOT_OK, PlanetStatus.OK, PlanetStatus.TO_DO];
    }
}
