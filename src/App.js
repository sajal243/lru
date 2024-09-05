import './App.css';
import MainComp from './components/MainComp';

function App() {
  return (
    <div className="App">
      <h1>Dynamic Content Loader with LRU cache</h1>
      <MainComp/>
    </div>
  );
}

export default App;
