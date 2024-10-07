import { Routes } from '@angular/router';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { ManagePublicationComponent } from './manage-publication/manage-publication.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageToolsComponent } from './manage-tools/manage-tools.component';
import { RouteGuardService } from '../services/route-guard.service';

export const MaterialRoutes: Routes = [
  {
    path: 'student',
    component: ManageStudentsComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'ens', 'etd'],
    },
  },
  {
    path: 'teacher',
    component: ManageTeachersComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'ens'],
    },
  },
  {
    path: 'publication',
    component: ManagePublicationComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'ens', 'etd'],
    },
  },
  {
    path: 'event',
    component: ManageEventsComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'ens', 'etd'],
    },
  },
  {
    path: 'tool',
    component: ManageToolsComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'ens', 'etd'],
    },
  },
];
