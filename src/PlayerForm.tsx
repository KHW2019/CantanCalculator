import React, { useState } from 'react';
import './PlayerForm.css';
import PlayerList from './PlayerList';


export interface PlayerInfo {
    playerId: number;
    playerName: string;
    colorOptions: colorOptions[];
}


interface colorOptions {
    color: string;
    disabled: boolean;
}

//List of avaliable color in the list   
const availableColors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'Purple']

//create a color Option array and set the value of disabled to false
export const colorOptionsMap: colorOptions[] = availableColors.map((color) => ({ color, disabled: false }));

//PlayerForm func
function PlayerForm() {
    const [playerName, setName] = useState('');
    //const [playerColor, setColor] = useState('');
    const [Id, setId] = useState<number>(0);
    const [players, setPlayers] = useState<PlayerInfo[]>([])
    //hooking the coloroptions
    const [colorOptionState, setColorOptionsState] = useState<colorOptions[]>(colorOptionsMap);

    const addPlayer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!playerName) {
            alert("Please entering a name")
            return;
        }
        else if (colorOptionState.length === availableColors.length) {
            alert("Please select a colour")
            
            return;
        }
        else if (players.some(p => p.playerName === playerName)) {
            alert("Player name already exist ")
            return;
        }
        else if (players.length >= 6) {
            alert("You cant have more then 6 people in a game")
            return
        }
        else if (colorOptionState.some(currentColor => currentColor.disabled === true)) {
            alert("This color has already been selected");
            return
        } else {
            const newPlayer: PlayerInfo = { playerId: Id, playerName, colorOptions: colorOptionState }; 
            setPlayers([...players, newPlayer]);

            setColorOptionsState(prevColorOptions => prevColorOptions.map((Option) => {
                if (colorOptionState.some(color => color.color === Option.color)) {
                    return { ...Option, disabled: true };
                }
                return Option;
            }));

            setId(prevPlayerId => prevPlayerId + 1);
            //setName('');
            //setColorOptionsState(colorOptionsMap);
        }
    }

    const handelEditPlayer = (editedPlayer: PlayerInfo) => {
        const updatePlayers = players.map((p) => {
            if (p.playerId === editedPlayer.playerId) {
                return editedPlayer;
            } else {
                return p;
            }
        });
        setPlayers(updatePlayers);
    }

    const deletePlayer = (playerToDelete: PlayerInfo) => {

        const newPlayers = players.filter(p => p.playerId !== playerToDelete.playerId);
        setPlayers(newPlayers);

        const updatedPlayers = newPlayers.map((p, index) => ({
            ...p,
            Id: index + 1,
        }));

        setPlayers(updatedPlayers);

        setPlayers(prevPlayers => prevPlayers.filter(player => player.playerId !== playerToDelete.playerId));
        setColorOptionsState((prevColorOptions) =>
            prevColorOptions.map((Option) => {
                if (colorOptionState.some(color => color.color === Option.color)) {
                    return { ...Option, disabled: false }
                }
                return Option;
            })
        )

    }

    //const checkWinner = () => {
    //    //if () {
            
    //    //}
    //}

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={addPlayer}>
                    <h1>Please Enter Your Player Details</h1>
                    <div className="playerName_Field">
                        <label htmlFor="playerName">Player Name: </label>
                        <input
                            id="Playername"
                            type="text"
                            placeholder="Name eg.idiot 1"
                            value={playerName}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="playerColor_Field">
                        <label htmlFor="plyaerColor">Player Color: </label>
                        <select
                            //*check is the two length of the array are same, if so stay with an empty drop box else return the selected value
                            value={colorOptionState.length === colorOptionsMap.length ? "" : colorOptionState.map(option => option.color)}
                            //*so it will set the display color in the player list
                            onChange={(event) => {
                                const selectedColors = Array.from(event.target.selectedOptions, option => option.value);
                                setColorOptionsState(selectedColors.map(color => ({ color, disabled: false })));
                            }}
                        >
                            <option value="" disabled>
                                --Please Choose a color--
                            </option>
                            {colorOptionsMap.map((Option) => (
                                <option
                                    key={Option.color}
                                    value={Option.color}
                                    disabled={Option.disabled || players.some(
                                        (p) => p.colorOptions.some(color => color.color === Option.color)
                                    )}
                                >
                                    {Option.color}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Add Player</button>
                </form>
                <div className="notification_container">
                    <div className="notification_message"></div>
                </div>
            </div>

            <ul className="playerList">
                <PlayerList players={players} onPlayerEdit={handelEditPlayer} onPlayerDelete={deletePlayer}></PlayerList>
            </ul>

        </div>
    );
}

export default  PlayerForm;