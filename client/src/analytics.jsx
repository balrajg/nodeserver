import React from 'react';

class Analytics extends React.Component {
   render() {
	  var myStyle = {
         fontSize: 20,
         color: '#FF0000'
      }
	  var content="Analytics content"
      return (
		  <div>
			  <div className="title">
            <h2>klfglkdsfjglksdjfkldsjflkdsjflkj</h2>
         </div>
            <span style={myStyle}>{content}</span>
			  <div className="title">
            <h2>jfksjkdfkjdsfkjsdkjfsdkf</h2>
         </div>
         </div>
      );
   }
}



export default Analytics;