import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FrameComponent } from './components/frame/frame.component';
import { MatchListComponent } from './components/match-list/match-list.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { StandingsComponent } from './components/standings/standings.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'frame',
        component: FrameComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'kampoppsett',
                component: MatchListComponent
            },
            {
                path: 'spesialspill',
                component: SpecialsComponent
            },
            {
                path: 'tabell',
                component: StandingsComponent
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [],
    exports: [RouterModule]
})

export class RoutingModule { }
