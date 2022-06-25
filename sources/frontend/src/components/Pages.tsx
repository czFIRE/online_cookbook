import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cookbook } from './Cookbook';
import { App } from '../App';
import { Components } from './Cookbook';

export const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<Cookbook centralComponent={Components.Welcome} />}/>
        <Route path="/recipe/:id"       element={<Cookbook centralComponent={Components.ShowRecipe} />} />
        <Route path="/recipe/create"    element={<Cookbook centralComponent={Components.AddRecipe} />} />
        <Route path="/search"           element={<Cookbook centralComponent={Components.SearchResult} />} />
        
        <Route path="/cookbook"         element={<Cookbook centralComponent={Components.Welcome} />}/>
        <Route path="/app"              element={<App />}/>
        
        <Route path="/user/:id"         element={<Cookbook centralComponent={Components.UserInfo} />}/>
        <Route path="/login"            element={<App />}/>
        <Route path="/signup"           element={<App />}/>
      </Routes>
    </BrowserRouter>
  );
};

// the last elements are those that should be added - placeholders

export default Pages;
