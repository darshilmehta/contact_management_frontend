import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';

class ErrorPage extends React.Component  {
    render() {
        return (
            <div>
                <NavBar />
                <div style={{"marginTop": "200px", "textAlign": "center", "fontSize": "60px", "color": "#0096C70", "fontWeight": "700"}}>
                    Error 404
                </div>
                <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center"}}>
                    <Link to='/'>
                        <button className='btnn card-btn'>Home Page</button>
                    </Link>
                </div>
            </div>
          )
    }
}

export default ErrorPage