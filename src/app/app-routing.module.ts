import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {ListCarteComponent} from './components/carte/list-carte/list-carte.component';
import {AddEventComponent} from './components/event/add-event/add-event.component';
import {ListEventComponent} from './components/event/list-event/list-event.component';
import {UpdateEventComponent} from './components/event/update-event/update-event.component';
import {AddGroupeComponent} from './components/groupe/add-groupe/add-groupe.component';
import {ListGroupeComponent} from './components/groupe/list-groupe/list-groupe.component';
import {UpdateGroupeComponent} from './components/groupe/update-groupe/update-groupe.component';
import {HomeComponent} from './components/home/home/home.component';
import {ProfileComponent} from './components/home/profile/profile/profile.component';
import {AddJeunesComponent} from './components/jeunes/add-jeunes/add-jeunes.component';
import {ListJeunesComponent} from './components/jeunes/list-jeunes/list-jeunes.component';
import {AddMaisonJeunesComponent} from './components/maison-jeunes/add-maison-jeunes/add-maison-jeunes.component';
import {ListMaisonJeunesComponent} from './components/maison-jeunes/list-maison-jeunes/list-maison-jeunes.component';
import {UpdateMaisonJeunesComponent} from './components/maison-jeunes/update-maison-jeunes/update-maison-jeunes.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ListPointsCadeauxComponent} from './components/points-cadeaux/list-points-cadeaux/list-points-cadeaux.component';
import {StatistiqueComponent} from './components/statistique/statistique/statistique.component';
import {AddStoryComponent} from './components/story/add-story/add-story.component';
import {ListStoryComponent} from './components/story/list-story/list-story.component';
import {UpdateStoryComponent} from './components/story/update-story/update-story.component';
import {MenuComponent} from "./components/menu/menu.component";
import { AddCarteComponent } from './components/carte/add-carte/add-carte.component';
import { DownloadCarteComponent } from './components/carte/download-carte/download-carte.component';
import { MaisonsComponent } from './components/maisons/maisons.component'; 
import { MaisonByIdComponent } from './components/maison-by-id/maison-by-id.component';
 
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'espace',
    component: MenuComponent,
    children: [
      {path: '', component: ProfileComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'cartes', component: AddCarteComponent},
      {path: 'carte', component: DownloadCarteComponent},
      {path: 'maisons', component: ListMaisonJeunesComponent},
      {path: 'utilisateurs', component: ListJeunesComponent},
      {path: 'groupes', component: ListGroupeComponent},
      {path: 'points', component: ListPointsCadeauxComponent},
      {path: 'demandes', component: ListCarteComponent},
      {path: 'statistique', component: StatistiqueComponent},
      {path: 'carte-jeune', component: AddJeunesComponent},
      {path: 'stat', component: StatistiqueComponent},
      {path: 'Maison', component: MaisonsComponent},
      {path: 'liste-event', component: ListEventComponent},
      {path: 'Maison/:id', component: MaisonByIdComponent}
    ]
  },
  {path: 'ajouter-event', component: AddEventComponent},
  {path: 'liste-event', component: ListEventComponent},
  {path: 'modifier-event', component: UpdateEventComponent},
  {path: 'ajouter-maison-jeunes', component: AddMaisonJeunesComponent},
  {path: 'liste-maison-jeunes', component: ListMaisonJeunesComponent},
  {path: 'modifier-maison-jeunes', component: UpdateMaisonJeunesComponent},
  {path: 'ajouter-jeunes', component: AddJeunesComponent},
  {path: 'liste-jeunes', component: ListJeunesComponent},
  {path: 'ajouter-story', component: AddStoryComponent},
  {path: 'liste-story', component: ListStoryComponent},
  {path: 'modifier-story', component: UpdateStoryComponent},
  {path: 'ajouter-groupe', component: AddGroupeComponent},
  {path: 'liste-groupe', component: ListGroupeComponent},
  {path: 'modifier-groupe', component: UpdateGroupeComponent},
  {path: 'ajouter-carte', component: AddCarteComponent},
  {path: 'liste-carte', component: ListCarteComponent},
  {path: 'points-cadeaux', component: ListPointsCadeauxComponent},
  {path: 'statistique', component: StatistiqueComponent},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
