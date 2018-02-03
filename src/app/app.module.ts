import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { UserService } from './services/user.service';
import { MatchService } from './services/match.service';
import { BetService } from './services/bet.service';
import { SpecialService } from './services/special.service';
import { ProgressService } from './services/progress.service';
import { FrameComponent } from './components/frame/frame.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { StandingsComponent } from './components/standings/standings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    MatchListComponent,
    LoginComponent,
    SpecialsComponent,
    StandingsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    RoutingModule,
    CdkTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatTabsModule,
    MatMenuModule,
    MatStepperModule,
    MatListModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  providers: [
    UserService,
    MatchService,
    BetService,
    SpecialService,
    ProgressService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
