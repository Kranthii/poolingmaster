import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import {AppComponent} from './index';
import { PoolComponent } from './pool/pool.component';
import { RegisterComponent} from './register/register.component';
// import { RegisterComponent } from './register/index';
// import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    {path: 'pool', component: PoolComponent},
    {path: 'register', component: RegisterComponent},
    // { path: 'register', component: RegisterComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);