import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import {
    MatButtonModule
} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

const modules = [
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}