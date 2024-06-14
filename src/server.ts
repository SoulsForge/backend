import { App } from '@/app';
import { AuthRoute } from './routes/auth.route';
import { HealthRoute } from './routes/health.route';
import { UserRoute } from './routes/user.route';

const app = new App([new HealthRoute(), new UserRoute(), new AuthRoute()]);

app.listen();
