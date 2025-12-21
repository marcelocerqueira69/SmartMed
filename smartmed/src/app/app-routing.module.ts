import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MedicationListComponent} from "./components/medication-list/medication-list.component";
import {MedicationCreationComponent} from "./components/medication-creation/medication-creation.component";

const routes: Routes = [
  { path: '', redirectTo: 'medications', pathMatch: 'full' },
  { path: 'medication/list', component: MedicationListComponent },
  { path: 'medication/new', component: MedicationCreationComponent },
  { path: 'medication/edit/:id', component: MedicationCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
