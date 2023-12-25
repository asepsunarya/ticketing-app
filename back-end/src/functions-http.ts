import { AdminAppModule } from './admin/admin-app.module';
import { AuthAppModule } from './auth/auth-app.module';
import { Http } from './bootstrap-http';

export const adminServer = new Http(AdminAppModule, 'admin');
export const authServer = new Http(AuthAppModule, 'auth');
