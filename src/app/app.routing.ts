import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import {AppComponent} from './index';
import { PoolComponent } from './pool/index';
import { RegisterComponent} from './register/register.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: 'pool', component: PoolComponent},
    {path: 'register', component: RegisterComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
