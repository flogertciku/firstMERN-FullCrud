
import './App.css';
import PersonForm from './components/PersonForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './views/Main';
import Detail from './components/Detail';
import Update from './components/Update';
import io from 'socket.io-client';  

const socket = io('http://localhost:8000',{ transports: ['websocket', 'polling', 'flashsocket'] });

function App() {

  return (
    <div className="App">
       <BrowserRouter>
            <Routes>
	        <Route element={<Main  socket={socket}/>} path="/" />
          <Route element={<Detail/>} path="/people/:id" /> 
          <Route element={<Update/>} path="/people/edit/:id"/>
            </Routes>
    	</BrowserRouter>
    </div>
  );
}

export default App;
