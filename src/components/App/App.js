import '../../index.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
function App() {
  return (
    <div className="App">
      <Header authorized={false} />
      <Main/>
    </div>
  );
}

export default App;
