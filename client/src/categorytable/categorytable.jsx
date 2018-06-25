import React from 'react';

class CategoryTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  items: []
		};
	}
	
	componentDidMount() {
    fetch("/getCatagories")
	.then(res=>res.json())
      .then(
        (result) => {
			//console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  
   render() {
	  var myStyle = {
         fontSize: 12,
         color: '#555',
		 borderCollapse:"collapse"
      }
	  const { error, isLoaded, items } = this.state;
     
	  if (error) {
		  return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
		  return <div>Loading...</div>;
		} else {
			 return (
			  <div>
			  <table width="100%" border='1' style={myStyle} >
			  <thead>
				<TableHeader />
				</thead>
				<tbody>
				{items.map(function(item, i){
				  return <TableRow item={item} key={i} />;
				})}
	
				
				</tbody>
				</table>
			 </div>
			 );
		}
      
   }
}


class TableRow extends React.Component {
   render() {
      return (
         <tr>
		 <th>{this.props.item.Cat_id}</th>
		 <th>{this.props.item.Name}</th>
		 <th>{this.props.item.parent}</th>
		 <th><a href='#' className='editCategoryLink' data-id={this.props.item.Cat_id}>Edit </a></th>
		 </tr>
      );
   }
}

class  TableHeader extends React.Component {
   render() {
      return (
         <tr>
		 <td>S.No</td>
		 <td>Name</td>
		 <td>Status</td>
		 <td>Edit</td>
		 </tr>
      );
   }
}



export default CategoryTable;