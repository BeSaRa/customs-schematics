//@ts-ignore
import { MenuItemContract } from '@contracts/menu-item-contract';
//@ts-ignore
import { AppIcons } from '@constants/app-icons';
//@ts-ignore
import { AppFullRoutes } from '@constants/app-full-routes';
//@ts-ignore
import { MenuIdes } from '@constants/menu-ides';

export const Menus: MenuItemContract[] = [
  {
    id: MenuIdes.ADMINISTRATION,
    langKey: 'menu_administration',
    icon: AppIcons.SETTINGS,
    path: AppFullRoutes.ADMINISTRATION,
  },
  {
    id: MenuIdes.LOCALIZATION,
    langKey: 'menu_localization',
    icon: AppIcons.TRANSLATE,
    path: AppFullRoutes.LOCALIZATION,
    parent: MenuIdes.ADMINISTRATION,
  },
  {
    id: MenuIdes.JOB_TITLE,
    langKey: 'menu_job_title',
    icon: AppIcons.TRANSLATE,
    path: AppFullRoutes.JOB_TITLE,
    parent: MenuIdes.ADMINISTRATION,
  },
];
