import React from 'react';
import { Link, NavLink } from 'react-router-dom';
class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active
        }
    }
    render() {
        var myStyle = {
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: '#1c448c'
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-custom " style={myStyle}>

                <Link className="navbar-brand" to="/">PrimeInsight</Link>
                <div id="navbarNav">
                    <ul className="navbar-nav">
					    <li className=' nav-item'> <NavLink exact={true}  activeClassName='active' className='nav-link'  to="/" >Reports</NavLink ></li>
                        <li className="nav-item"><NavLink  exact={true}  activeClassName='active' className='nav-link'  to="/analytics">Comparision</NavLink ></li>
                        <li className="nav-item" ><NavLink exact={true}  activeClassName='active' className='nav-link'  to="/uploadresults">Upload Results</NavLink ></li>

                    </ul>
                </div>

            </nav>
        );
    }
}


export default MainMenu;