import React, { useState } from "react";
import "./PlayerPoints.css"

type numberOfProperty = {
    city: number;
    settelment: number;
}

const CITY_VALUE = 2;
const MAX_SETTELMENTS = 5;
const MAX_CITIES = 4;
const WINNING_POINTS = 10;


const PlayerPoint: React.FC = () => {
    const [playerPoints, setPlayerPoints] = useState<numberOfProperty>({
        city: 0,
        settelment: 2
    });

    const addSettelment = () => {
        if (Total_Points <= WINNING_POINTS && playerPoints.settelment < MAX_SETTELMENTS) {
            setPlayerPoints((prevPoints) => ({
                ...prevPoints,
                settelment: prevPoints.settelment + 1
            }))
        }
    }
    const removeSettelment = () => {
        if (playerPoints.settelment > 0) {
            setPlayerPoints((prevPoints) => ({
                ...prevPoints,
                settelment: prevPoints.settelment - 1
            }))
        }
    }

    const addCity = () => {
        if (Total_Points < WINNING_POINTS && playerPoints.city < MAX_CITIES && playerPoints.settelment > 0) {
            setPlayerPoints((prevPoints) => ({
                ...prevPoints,
                city: prevPoints.city + 1,
                settelment: prevPoints.settelment - 1
            }))
        }
    }

    const removeCity = () => {
        if (playerPoints.city > 0) {
            setPlayerPoints((prevPoints) => ({
                ...prevPoints,
                city: prevPoints.city - 1,
                settelment: prevPoints.settelment + 1
            }))
        }
    }

    const Total_Points = playerPoints.city * CITY_VALUE + playerPoints.settelment;

    return (
        <div className = "containerPP">
            <div className="settelment">
                <h4 className="settelmentTitle">Settelment</h4>
                <button className="addSettelmentBT"onClick={addSettelment}>+</button>
                {playerPoints.settelment}
                <button className="subtractSettelmentBT" onClick={removeSettelment}>-</button>
            </div>
            <div className="city">
                <h4 className="cityTitle">City</h4>
                <button className="addCityBT" onClick={addCity}>+</button>
                {playerPoints.city}
                <button className="subtractCityBT" onClick={removeCity}>-</button>
            </div>
            <div className="pp">
                <h4 className="ppTitle">Player Points :</h4>
                {Total_Points}
            </div>
        </div>
    );
};

export default PlayerPoint;