//import logo from './logo.svg';
import './App.css';
import MultiButton from './cgu_multiButton'
import HelloCGU  from './cgu_hello';
import CGU_Login from './cgu_login';
/*function App() {
  return (
    <div className="App">
      <h1 style = { styleArgument } onClick= {changeText}>hello CGU!!
        
      </h1>
    </div>
  );
}*/

function App(){
  return (
      <div className="App">
          <div>{ CGU_Login()}</div>
          
      </div>
  );
}

export default App;
