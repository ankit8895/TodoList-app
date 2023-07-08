import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div>
      <Header />
      <main className='mt-3'>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
