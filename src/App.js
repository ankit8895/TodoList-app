import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div>
      <ToastContainer
        position='top-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        pauseOnHover
        pauseOnFocusLoss
        theme='dark'
      />
      <Header />
      <main className='mt-3'>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
