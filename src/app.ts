import express, { Application } from 'express'
import cors from 'cors'
import routes from './app/routes'
import path from 'path';
import fs from 'fs';

import markdownIt from 'markdown-it';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();
const md = markdownIt();


app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)


const readmePath = path.join(__dirname, '..', 'README.md');
// render README.md file on base url link
const readmeContent = fs.readFileSync(readmePath, 'utf8');
const readmeHtml = md.render(readmeContent);

// Error handle
app.use(globalErrorHandler)

app.get('/', (req, res) => {
  res.send(readmeHtml);
});

export default app
