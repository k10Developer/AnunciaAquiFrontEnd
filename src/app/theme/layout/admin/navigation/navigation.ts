import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Menu',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Painel',
        type: 'item',
        url: '/dashboard/default',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'menu1',
        title: 'Cadastros',
        type: 'collapse',
        icon: 'feather icon-pen',
        children: [
          {
            id: 'menu2',
            title: 'Usuário',
            type: 'item',
            icon: 'feather icon-user',
            classes: 'nav-item',
            url: '/users'           
          } ,
          {
            id: 'menu3',
            title: 'Veículo',
            type: 'item',
            icon: 'feather icon-crosshair',
            classes: 'nav-item',
            url: '/veiculos'           
          },
          {
            id: 'menu4',
            title: 'Anúncio',
            type: 'item',
            icon: 'feather icon-minus-square',
            classes: 'nav-item',
            url: '/anuncios'           
          },
          {
            id: 'menu4',
            title: 'Relatório',
            type: 'item',
            icon: 'feather icon-book',
            classes: 'nav-item',
            url: '/relatorio'           
          }   

        ]
      },
      {
        id: 'menu5',
        title: 'Cadastros Auxiliares',
        type: 'collapse',
        icon: 'feather icon-pen',
        children: [
          {
            id: 'menu6',
            title: 'Marca',
            type: 'item',
            icon: 'feather icon-crosshair',
            classes: 'nav-item',
            url: '/marcas'           
          },
          {
            id: 'menu7',
            title: 'Modelo',
            type: 'item',
            icon: 'feather icon-crosshair',
            classes: 'nav-item',
            url: '/modelos'           
          }
        ]
      }
    
    ]
  }
  
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
