/* eslint-disable */
import {
  RouterModule,
  Routes
} from '@angular/router';
import{AdministrationComponent}from'./components/administration.component';
import { SharedModule } from '../shared/components/shared.module';
import {
  DropdownModule,
  FileUploadModule,
  InputTextModule,
  TooltipModule,
  PanelModule,
  BreadcrumbModule,
  InputTextareaModule,
  AutoCompleteModule,
  InputSwitchModule,
  OverlayPanelModule,
  ProgressSpinnerModule,
  MessageModule,
  CheckboxModule,
  TreeModule,
  ToggleButtonModule
} from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/primeng';
import { AdministrationGuard } from './guards/administration.guard';
import { AdministrationService } from './services/administration.service';
