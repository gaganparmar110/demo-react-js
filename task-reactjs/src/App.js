import './App.css';
import Admins from './Components/Admin/Admins';
import { Provider } from 'react-redux';
import { store } from "Redux/Store";
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Admins />
      </Provider>
    </div>
  );
}

export default App;
