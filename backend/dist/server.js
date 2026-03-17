import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authRouter } from './routes/auth.routes.js';
import { propertyRouter } from './routes/property.routes.js';
import { userRouter } from './routes/user.routes.js';
dotenv.config();
const app = express();
app.use(express.json());
const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(cors({
    origin: clientOrigin ? [clientOrigin] : true,
    credentials: true,
}));
app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'backend' });
});
app.use('/api/auth', authRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/users', userRouter);
const port = Number(process.env.PORT ?? 5000);
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
});
