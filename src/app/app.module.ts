import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from './app.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { CalendarioComponent }  from './components/calendario/calendario.component';
import { PageNotFoundComponent }from './pages/page-not-found/page-not-found.component';

import { ApiService }           from './shared/api.service';

const appRoutes: Routes = [
  { path: 'agendamento', component: AgendamentoComponent },
  { path: '', redirectTo: '/agendamento', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AgendamentoComponent,
    CalendarioComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
		ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
