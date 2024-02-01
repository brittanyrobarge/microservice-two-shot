import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import HatList from './HatList';
import HatForm from './HatForm';
import Nav from './Nav';
import ShoeList from './ShoeList';
import ShoeForm from './ShoeForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats">
            <Route index element={<HatList />} />
            <Route path="new" element={<HatForm />} />
          </Route>
          <Route path="/shoes">
            <Route index element={<ShoeList shoes={props.shoes} />} />
            <Route path="new" element={<ShoeForm /> } />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
