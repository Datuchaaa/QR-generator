import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;