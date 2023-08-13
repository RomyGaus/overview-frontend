import React from "react";
import "./Header.css";

const Header = ({ route, onRouteChange }) => {
    return (
        <div className="header">
            <div className='banner'>
                {route === 'overview'
                    ?   <div className="banner-overview">
                            <h1>Overview</h1>
                            <h4>Organize your supplies and find out what you need to buy soon!</h4>
                        </div>
                    :   <div>
                            <h1>Shopping List</h1>
                        </div>
                }
            </div>
            <div className="nav">
                <button className='btn-shopping' onClick={() => onRouteChange('shopping list')}>Shopping List</button>
                <button className='btn-back' onClick={() => onRouteChange('overview')}>Overview</button>
            </div>
        </div>
    );
}

export default Header;