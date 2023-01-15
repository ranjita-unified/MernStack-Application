import { useRoutes } from 'react-router-dom';

import Home from './component/Home/Home';
import Dashboard from './component/Account/Dashboard';
import Editors from './component/Account/Editors';

const App = () => {

  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'myaccount',
      element: <Dashboard />,
    },
    {
      path: 'editors',
      element: <Editors />,
    }
  ]);
  return routes;
}

export default App;
