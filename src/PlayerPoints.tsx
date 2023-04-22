import React, { useState } from "react";

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
        <div>
            <div>
                <h4>Settelment</h4>
                <button onClick={addSettelment}>+</button>
                {playerPoints.settelment}
                <button onClick={removeSettelment}>-</button>
            </div>
            <div>
                <h4>City</h4>
                <button onClick={addCity}>+</button>
                {playerPoints.city}
                <button onClick={removeCity}>-</button>
            </div>
            <div>
                <h4>Player Points</h4>
                {Total_Points}
            </div>
        </div>
    );
};

export default PlayerPoint;