import './App.css';
import Crud from './components/Crud';
import {AppProvider} from '@8base/app-provider';

function App() {

const ENDPOINT_URL = 'https://api.8base.com/cktd6hfg7003a09ik3nt5c3zi';

  return (
    <AppProvider uri={ENDPOINT_URL} >
      <div className="App">
        <Crud/>
      </div>
    </AppProvider>
  );
}

export default App;
