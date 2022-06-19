import express from 'express';
import cors from 'cors';
import { signUp, landingPage, login, recipe, user } from './resources';

const api = express();

api.use(cors());

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.use(express.static('public'));

/**
 * Default page
 */
api.get('/', landingPage.show);

//  User SignUp
api.get('/signup', signUp.show);
api.post('/signup', signUp.signUp);

// User Login
api.get('/login', login.show);
api.post('/login', login.login);


// Recipe handling
api.get('/recipe', recipe.list);
api.get('/recipe/category/:category', recipe.listCategory)
api.get('/recipe/:id', recipe.show);
api.patch('/recipe/:id', recipe.update);
api.post('/recipe/:id', recipe.setRating);
api.post('/recipe', recipe.create);
api.delete('/recipe/:id', recipe.destroy);

// User
api.get('/user/?:id', user.profile);

// Admin stuff


/**
 * Start listening on connections
 */
api.listen(3003, () => console.log(`Example app listening on port ${3003}`));
