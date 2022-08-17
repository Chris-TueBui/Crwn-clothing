import Home from "./routes/Home/home.component.jsx";
import {Routes, Route} from 'react-router-dom'; 
import Navigation from "./routes/Navigation/navigation.component.jsx";
import Signin from "./routes/Signin/signin.component.jsx";

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
          <Route path="Signin" element={<Signin/>}/>
        </Route>
      </Routes>
  );
};

export default App;
