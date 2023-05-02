// @ts-ignore
import {NgModule} from '@angular/core';
// @ts-ignore
import {RouterModule, Routes} from '@angular/router';
// @ts-ignore
import {AdministrationComponent} from './administration.component';
// @ts-ignore
import {AppRoutes} from '@constants/app-routes';
// @ts-ignore
import {LocalizationComponent} from '@modules/administration/components/localization/localization.component';


const routes: Routes = [
    {path: '', component: AdministrationComponent},
    {
        path: AppRoutes.LOCALIZATION,
        component: LocalizationComponent,
    }
];

// @ts-ignore
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
// @ts-ignore
export class AdministrationRoutingModule {
}
