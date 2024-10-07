import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  role: string;
  role2: string;
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'dashboard',
    role: '',
    role2: '',
  },
  {
    state: 'student',
    name: 'Manage Students',
    type: 'link',
    icon: 'school',
    role: '',
    role2: '',
  },
  {
    state: 'teacher',
    name: 'Manage Teachers',
    type: 'link',
    icon: 'person_search',
    role: 'admin',
    role2: 'ens',
  },
  {
    state: 'publication',
    name: 'Manage Publications',
    type: 'link',
    icon: 'publication',
    role: '',
    role2: '',
  },
  {
    state: 'event',
    name: 'View Events',
    type: 'link',
    icon: 'event',
    role: '',
    role2: '',
  },
  {
    state: 'tool',
    name: 'Manage Tools',
    type: 'link',
    icon: 'handyman',
    role: '',
    role2: '',
  },
];
@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
