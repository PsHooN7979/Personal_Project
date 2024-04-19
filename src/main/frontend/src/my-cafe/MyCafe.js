import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {LoginContext} from "../contexts/LoginContextProvider";

const MyCafe = () => {

    const {myCafeList, myCafes, userInfo} = useContext(LoginContext);

    useEffect(() => {
        if (userInfo && userInfo.idx)
            myCafeList(userInfo.idx);
            console.log(myCafes)
    }, [userInfo]);


    return (
        <div className="container">
            <h2>My Café List</h2>
        </div>
    )
}

export default MyCafe;