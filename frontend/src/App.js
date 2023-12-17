import Header from './components/Header';
import './App.css';
import Table from './components/Table';
import Stat from './components/Stat';
import Barchart from './components/Barchart';

function App() {
  return (
    <div className="App">
             
             <Header/>
             <Table/>
           <div className='single-div'>
           <Barchart/>
           <Stat/>
            </div>  
             

    </div>
  );
}

export default App;
