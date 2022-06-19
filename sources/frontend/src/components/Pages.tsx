import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddRecipe } from './AddRecipe';
import { Recipe } from './Recipe';
import { SearchResult } from  './SearchResult';
import { Cookbook } from './Cookbook';
import { App } from '../App';
import { Welcome } from './Welcome';

export const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<Welcome />}/>
        <Route path="/recipe/:id"       element={<Recipe />} />
        <Route path="/recipe/create"    element={<AddRecipe />} />
        <Route path="/search"           element={<SearchResult />} />
        
        <Route path="/cookbook"         element={<Cookbook />}/>
        <Route path="/app"              element={<App />}/>
        
        <Route path="/user/:id"         element={<App />}/>
        <Route path="/login"            element={<App />}/>
        <Route path="/signup"           element={<App />}/>
      </Routes>
    </BrowserRouter>
  );
};

// the last elements are those that should be added - placeholders

export default Pages;
