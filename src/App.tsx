import {BrowserRouter, Route, Switch} from 'react-router-dom';


import { Home } from './pages/Home';


function App() {

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          {/*<Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />*/}
        </Switch>
    </BrowserRouter>

  );
}

export default App;
