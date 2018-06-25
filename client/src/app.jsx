import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './home';
import MainMenu from './nav';
import AppFooter from './appfooter';
import UploadResults from './uploadresults';
import Analytics from './analytics';
import './css/app.css';

class App extends React.Component {
   render() {
      return (
		  <div>
			<Router >
			    <div>
				   <MainMenu  />
				   <Route path="/" exact={true} component={HomePage} />
				   <Route path="/uploadresults" component={UploadResults} />
				   <Route path="/analytics" component={Analytics} />
			   </div>
		    </Router>
			<AppFooter />
         </div>
      );
   }
}


export default App;