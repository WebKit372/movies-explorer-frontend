import '../../index.css'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
function App() {
  return (
    <>
      <Header authorized={false} />
      <Main/>
      <Movies/>
      <Footer/>
    </>
  );
}

export default App;
