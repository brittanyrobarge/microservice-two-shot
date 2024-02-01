import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import HatList from './HatList';
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
          <Route path="/hats" element={<HatList />} />
          <Route path="/shoes">
            <Route index element={<ShoeList shoes={props.shoe} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
