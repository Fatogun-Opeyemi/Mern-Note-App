import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 8005;

await connectDB();

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
