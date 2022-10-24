import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Hospital from './components/hospital/Hospitals';
import NoPage from './components/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/hospitals" element={<Hospital />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
