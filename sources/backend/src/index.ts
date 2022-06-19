import express from 'express';
import cors from 'cors';
import { signUp, landingPage, login, recipe, user, category } from './resources';

const api = express();

api.use(cors());

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(express.static('public'));

// //  User SignUp
// api.get('/signup', signUp.show);
// api.post('/signup', signUp.signUp);

// // User Login
// api.get('/login', login.show);
// api.post('/login', login.login);


// Recipe handling
api.get('/recipe', recipe.list);
api.get('/recipe/:id', recipe.show);
api.patch('/recipe/:id', recipe.update);
api.post('/recipe/:id', recipe.setRating);
api.post('/recipe', recipe.create);
api.delete('/recipe/:id', recipe.destroy);

// Categories
api.get('/category', category.categories)
api.get('/category/:name', category.listCategory)

// User
api.get('/user/?:id', user.profile);

// Admin stuff


/**
 * Start listening on connections
 */
api.listen(3003, () => console.log(`Example app listening on port ${3003}`));
