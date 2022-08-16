import Home from "./routes/Home/home.component.jsx";
import {Routes, Route} from 'react-router-dom'; 
import Navigation from "./routes/Navigation/navigation.component.jsx";

const Shop = () => {
  return <h1>I am the shop page</h1>
}


const App = () => {
  return(
      <Routes>
        <Route path="/" element={<Navigation/>}>
          {/* index make the element as the homepage as well */}
          <Route index element={<Home/>}/>
          <Route path="shop" element={<Shop/>}/>
        </Route>
      </Routes>
  );
};

export default App;
