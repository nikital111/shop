import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../actions/actions";
import "./Cab.css";
import { useEffect } from "react";

const Cab = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector((state) => state.isAdmin);
        if(!isAdmin && localStorage.getItem('isAdmin')){
            dispatch(setAdmin())
        }
  return (
    <div>

    </div>
  );
};

export default Cab;
