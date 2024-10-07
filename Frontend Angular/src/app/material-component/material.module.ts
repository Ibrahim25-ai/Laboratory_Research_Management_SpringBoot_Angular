import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';

import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { ManageTeachersComponent } from './manage-teachers/manage-teachers.component';
import { StudentComponent } from './dialog/student/student.component';
import { TeacherComponent } from './dialog/teacher/teacher.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ManagePublicationComponent } from './manage-publication/manage-publication.component';
import { PublicationComponent } from './dialog/publication/publication.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageToolsComponent } from './manage-tools/manage-tools.component';
import { EventComponent } from './dialog/event/event.component';
import { ToolComponent } from './dialog/tool/tool.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    MatDatepickerModule,
  ],
  providers: [],
  declarations: [
    ManageStudentsComponent,
    ManageTeachersComponent,
    ManagePublicationComponent,
    StudentComponent,
    TeacherComponent,
    PublicationComponent,
    ConfirmationComponent,
    ManageEventsComponent,
    ManageToolsComponent,
    EventComponent,
    ToolComponent,
    ChangePasswordComponent,
  ],
})
export class MaterialComponentsModule {}
