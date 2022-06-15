



import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
import indexRoutes from './Routes/IndexRoute';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {
            indexRoutes.map(
              (route, index) => {
                return (
                  <Route key={index} path={route.path} element={route.main} />
                )
              }
            )
          }
        </Routes>


      </Router>
    </div>
  );
}

export default App;
