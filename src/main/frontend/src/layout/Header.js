import React from 'react';

function Header() {

    return (
        <div className="header-container">
            <div className="header">

                <nav className="navigation">
                    <a href="http://localhost:3000/">Home</a>
                    <a href="http://localhost:3000/reservationlist">Reservation</a>
                    <a href="http://localhost:3000/list">Find cafe</a>
                    <a href="http://localhost:3000/cafe">Register cafe </a>
                    <a href="http://localhost:3000/mypage">My page </a>
                </nav>
                <hr/>
            </div>
        </div>
    );
}

export default Header;