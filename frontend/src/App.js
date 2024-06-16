
import './App.css';
import Home from './screen/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './screen/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screen/Signup';
import {Provider} from 'react-redux'
import MyOrder from './screen/MyOrder';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import store from './redux/store.js';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div >
        <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/create' element={<Signup />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
          </Routes>
          <Footer />
        </div>

      </BrowserRouter>
    </Provider>

  );
}

export default App;
