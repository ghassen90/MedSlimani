import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {MdbAccordionModule} from 'mdb-angular-ui-kit/accordion';
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {MdbCollapseModule} from 'mdb-angular-ui-kit/collapse';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPagination
import {MdbPopoverModule} from 'mdb-angular-ui-kit/popover';
import {MdbRadioModule} from 'mdb-angular-ui-kit/radio';
import {MdbRangeModule} from 'mdb-angular-ui-kit/range';
import {MdbRippleModule} from 'mdb-angular-ui-kit/ripple';
import {MdbScrollspyModule} from 'mdb-angular-ui-kit/scrollspy';
import {MdbTabsModule} from 'mdb-angular-ui-kit/tabs';
import {MdbTooltipModule} from 'mdb-angular-ui-kit/tooltip';
import {MdbValidationModule} from 'mdb-angular-ui-kit/validation';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HomeComponent} from './components/home/home/home.component';
import {ListEventComponent} from './components/event/list-event/list-event.component';
import {AddEventComponent} from './components/event/add-event/add-event.component';
import {UpdateEventComponent} from './components/event/update-event/update-event.component';
import {AddMaisonJeunesComponent} from './components/maison-jeunes/add-maison-jeunes/add-maison-jeunes.component';
import {ListMaisonJeunesComponent} from './components/maison-jeunes/list-maison-jeunes/list-maison-jeunes.component';
import {UpdateMaisonJeunesComponent} from './components/maison-jeunes/update-maison-jeunes/update-maison-jeunes.component';
import {AddStoryComponent} from './components/story/add-story/add-story.component';
import {UpdateStoryComponent} from './components/story/update-story/update-story.component';
import {ListStoryComponent} from './components/story/list-story/list-story.component';
import {ListPointsCadeauxComponent} from './components/points-cadeaux/list-points-cadeaux/list-points-cadeaux.component';
import {StatistiqueComponent} from './components/statistique/statistique/statistique.component';
import {AddGroupeComponent} from './components/groupe/add-groupe/add-groupe.component';
import {UpdateGroupeComponent} from './components/groupe/update-groupe/update-groupe.component';
import {ListGroupeComponent} from './components/groupe/list-groupe/list-groupe.component';
import {ProfileComponent} from './components/home/profile/profile/profile.component';
import {NavbarComponent} from './components/home/profile/navbar/navbar.component';
import {SidebarComponent} from './components/home/profile/sidebar/sidebar.component';
import {ListJeunesComponent} from './components/jeunes/list-jeunes/list-jeunes.component';
import {AddJeunesComponent} from './components/jeunes/add-jeunes/add-jeunes.component';
import { MenuComponent } from './components/menu/menu.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { ListCarteComponent } from './components/carte/list-carte/list-carte.component';
import { AddCarteComponent } from './components/carte/add-carte/add-carte.component';
import { DownloadCarteComponent } from './components/carte/download-carte/download-carte.component';
import { MaisonsComponent } from './components/maisons/maisons.component';
import { MaisonByIdComponent } from './components/maison-by-id/maison-by-id.component'; 
 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ListEventComponent,
    AddEventComponent,
    UpdateEventComponent,
    AddMaisonJeunesComponent,
    ListMaisonJeunesComponent,
    UpdateMaisonJeunesComponent,
    AddStoryComponent,
    UpdateStoryComponent,
    ListStoryComponent,
    ListPointsCadeauxComponent,
    StatistiqueComponent,
    AddGroupeComponent,
    UpdateGroupeComponent,
    ListGroupeComponent,
    AddCarteComponent,
    ListCarteComponent,
    SidebarComponent,
    ListJeunesComponent,
    AddJeunesComponent,
    MenuComponent,
    DownloadCarteComponent,
    MaisonsComponent,
    MaisonByIdComponent, 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCheckboxModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    NgxPaginationModule,
    MdbValidationModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, // Add FormsModule here

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
