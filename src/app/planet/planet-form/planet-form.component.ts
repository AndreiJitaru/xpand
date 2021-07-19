import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanetStatus } from 'src/app/shared/constants/planet-status.constant';
import { Planet } from 'src/app/shared/interfaces/planet';
import { PlanetService } from 'src/app/shared/services/planet.service';

@Component({
    selector: 'app-planet-form',
    templateUrl: './planet-form.component.html',
    styleUrls: ['./planet-form.component.scss']
})
export class PlanetFormComponent implements OnInit {

    public captains!: string[];
    public planet!: Planet;
    public planetForm!: FormGroup;
    public robots!: string[];
    public statuses!: string[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { planetId: string },
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<PlanetFormComponent>,
        private planetService: PlanetService
    ) { }

    ngOnInit(): void {
        this.captains = this.planetService.getAllCaptains();
        this.planet = this.planetService.getPlanetById(this.data.planetId) as Planet;
        this.robots = this.planetService.getAllRobots();
        this.statuses = this.planetService.getPlanetStatuses();
        this.initForm(this.planet);
    }

    private initForm(planet: Planet): void {
        this.planetForm = this.fb.group({
            status: planet.status,
            description: this.fb.group({
                text: {
                    value: planet.description?.text,
                    disabled: (planet.status === PlanetStatus.EN_ROUTE) || (planet.status === PlanetStatus.TO_DO)
                },
                captain: {
                    value: planet.description?.captain,
                    disabled: planet.status === PlanetStatus.TO_DO
                },
                robots: {
                    value: planet.description?.robots,
                    disabled: planet.status === PlanetStatus.TO_DO
                }
            })
        });
    }

    public onSelectionChanged({ value }: any): void {
        const descriptionFormGroup = this.planetForm.get('description');
        if (value === PlanetStatus.EN_ROUTE) {
            descriptionFormGroup?.get('text')?.disable();
            descriptionFormGroup?.get('text')?.setValue('');
            descriptionFormGroup?.get('captain')?.enable();
            descriptionFormGroup?.get('robots')?.enable();
        } else if (value === PlanetStatus.TO_DO) {
            descriptionFormGroup?.get('text')?.disable();
            descriptionFormGroup?.get('text')?.setValue('');
            descriptionFormGroup?.get('captain')?.disable();
            descriptionFormGroup?.get('captain')?.setValue('');
            descriptionFormGroup?.get('robots')?.disable();
            descriptionFormGroup?.get('robots')?.setValue([]);
        } else {
            descriptionFormGroup?.get('text')?.enable();
            descriptionFormGroup?.get('text')?.setValue(this.planet.description?.text);
            descriptionFormGroup?.get('captain')?.enable();
            descriptionFormGroup?.get('captain')?.setValue(this.planet.description?.captain);
            descriptionFormGroup?.get('robots')?.enable();
            descriptionFormGroup?.get('robots')?.setValue(this.planet.description?.robots);
        }
    }

    public onSubmit(): void {
        const descriptionFormGroup = this.planetForm.get('description');
        const planetData = {
            description: {
                captain: descriptionFormGroup?.get('captain')?.value,
                robots: descriptionFormGroup?.get('robots')?.value,
                text: descriptionFormGroup?.get('text')?.value
            },
            status: this.planetForm?.get('status')?.value
        };
        this.planetService.updatePlanet(this.data.planetId, planetData);
        this.dialogRef.close({ status: 1 });
    }

    public closeDialog(): void {
        this.dialogRef.close({ status: -1 });
    }

}
