import express from 'express';
import cors from 'cors';
import { recipe, category, image } from './resources';
import multer = require('multer');

const api = express();

api.use(cors());

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(express.static('public'));

// Recipe handling
api.get('/recipe',                recipe.list);
api.get('/recipe/:id',            recipe.show);
api.post('/recipe',               recipe.create);
api.get('/recipe/:id/image',      recipe.getImages);
api.post('/recipe/:id/image',     image.upload)
api.post('/recipe/:id/image2',    multer().single('body'), image.upload)
api.delete('/recipe/:id',         recipe.destroy);

// Categories
api.get('/category',            category.categories)
api.get('/category/:name',      category.listCategory)
api.get('/category/:id/name',   category.getCategoryName)

/**
 * Start listening on connections
 */
api.listen(process.env.REACT_APP_BACKEND_PORT, () => console.log(`App listening on port ${process.env.REACT_APP_BACKEND_PORT}`));
