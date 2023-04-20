import { type } from "@testing-library/user-event/dist/type";
import { totalmem } from "os";
import React, { useState } from "react";
import PlayerForm, { PlayerInfo } from "./PlayerForm";

type props = {
    players: PlayerInfo[];
}

type numberOfProperty = {
    city: number;
    settelment: number;
}

const CITY_VALUE = 2;
const SETTELMENT_VALUE = 1;
const MAX_SETTELMENTS = 5;
const MAX_CITIES = 4;
const WINNING_POINTS = 10;

//players not being used yet it will be use later when checkwinner method has implmented
const PlayerPoint: React.FC<props> = ({ players }) => {
    const [playerPoints, setPlayerPoints] = useState<numberOfProperty>({
        city: 0,
        settelment: 2
    });

    const addSettelment = () => {
        if (Total_Points + SETTELMENT_VALUE <= WINNING_POINTS && playerPoints.settelment <= MAX_SETTELMENTS) {
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
        if (Total_Points + CITY_VALUE <= WINNING_POINTS && playerPoints.city < MAX_CITIES && playerPoints.settelment > 0) {
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

    //check is the player hit 10 points if so display winner's name'
    //const checkWinner = () => {
    //    if (Total_Points >= 10) {

    //    }
    //}

    const Total_Points = playerPoints.city * CITY_VALUE + playerPoints.settelment;

    return (
        <div>
            <div>
                <h2>Settelment</h2>
                <button onClick={addSettelment}>+</button>
                {playerPoints.settelment}
                <button onClick={removeSettelment}>-</button>
            </div>
            <div>
                <h2>City</h2>
                <button onClick={addCity}>+</button>
                {playerPoints.city}
                <button onClick={removeCity}>-</button>
            </div>
            <div>
                <h2>Player Points</h2>
                {Total_Points}
            </div>
        </div>
    );
};

export default PlayerPoint;