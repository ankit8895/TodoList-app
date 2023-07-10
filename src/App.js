//import ToastContainer
import { ToastContainer } from 'react-toastify';
//import react-react-toastify/dist/ReactToastify.css
import 'react-toastify/dist/ReactToastify.css';
//import Header component
import Header from './components/Header';
//import Footer component
import Footer from './components/Footer';
//import HomePage component
import HomePage from './Pages/HomePage';

//create react class component App
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

//export App component
export default App;
