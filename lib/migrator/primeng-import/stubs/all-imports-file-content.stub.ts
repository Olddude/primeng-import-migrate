const allImportsFileContentStub = `import {
  RouterModule,
  Routes
} from '@angular/router';
import { SharedModule } from '../shared/components/shared.module';
import {
  TreeModule,
  ToggleButtonModule,
  ButtonModule, InputTextModule
} from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/primeng';
import { AdministrationGuard } from './guards/administration.guard';
import { AdministrationService } from './services/administration.service';`;

export { allImportsFileContentStub };
