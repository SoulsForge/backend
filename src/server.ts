import { App } from '@/app';
import { AuthRoute } from './routes/auth.route';
import { EldenRingRoute } from './routes/elden-ring.route';
import { HealthRoute } from './routes/health.route';
import { UserRoute } from './routes/user.route';

const routes = [new HealthRoute(), new UserRoute(), new AuthRoute(), new EldenRingRoute()];

const app = new App(routes);

app.listen();
