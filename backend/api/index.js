import dotenv from 'dotenv';
import { createApp } from '../src/app.js';
// Load env vars for Vercel serverless runtime
dotenv.config();
const app = createApp();
export default app;
