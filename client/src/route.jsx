import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './app'; 
import UploadResults from './uploadresults';
import Analytics from './analytics';

export default (

 <Switch>
          <Route exact name="index" path="/" component={Index} />
		  
		  
		  </Switch
<Router history={browserHistory}>
  <Route path="/" exact={true} component={App} />
  <Route path="uploadresults" component={()=>(
	<div> AAAAAAAAAAAAAAAAAAAAA</div>
  )} />
  </Router>
    
);