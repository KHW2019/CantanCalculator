import React, { useState } from 'react';
import PlayerList from './PlayerList';
import PlayerPoint from './PlayerPoints';   

export interface PlayerInfo {
    playerId: number;
    playerName: string;
    playerColor: string;
}

interface colorOptions {
    color: string;
    disabled: boolean;
}

const availableColors = ['red', 'blue', 'green', 'yellow', 'black' , 'purple']

export const colorOptions = availableColors.map((color) => ({ color, disabled: false }));

function PlayerForm() {
    const [playerName, setName] = useState('');
    const [playerColor, setColor] = useState('');
    const [playerId, setId] = useState<number>(1);
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [colorOptionState, setColorOptionsState] = useState<colorOptions[]>(colorOptions);

    const addPlayer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!playerName) {
            alert("You must be the first human without a name... PUT YOUR NAME IN THE BOX!!!!")
            return;
        }
        else if (!playerColor) {
            alert("Are you color blind ? PICK A COLOR!!!!!")
            return;
        }
        else if (players.some(p => p.playerName === playerName)) {
            alert("oh so you are the type of people loves to copy others, Use another name ")
            return;
        } 
        else if (players.length >= 6) {
            alert("First time playing cantan? You cant play it more then 6 people!")
            return 
        } else {
            const newPlayer: PlayerInfo = { playerId: playerId, playerName, playerColor }; 
            setPlayers([...players, newPlayer]);
            setColorOptionsState(prevColorOptions => prevColorOptions.map((Option) => {
                if (Option.color === playerColor) {
                    return { ...Option, disabled: true };
                }
                return Option;
            }));

            setId(prevPlayerId => prevPlayerId + 1);
            setName('');
            setColor('');
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

    const deletePlayer = (player: PlayerInfo) => {
        setPlayers(players.filter(player => player.playerId !== player.playerId));
        setColorOptionsState((prevColorOptions) =>
            prevColorOptions.map((Option) => {
                if (Option.color === player.playerColor) {
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
        <>
            <form onSubmit={addPlayer}>

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
                        value={playerColor}
                        onChange={(event) => setColor(event.target.value)}
                    >
                        <option value="" disabled>
                            --Please Choose a color--
                        </option>
                        {colorOptions.map((Option) => (
                            <option
                                key={Option.color}
                                value={Option.color}
                                disabled={Option.disabled || players.some(
                                    (p) => p.playerColor === Option.color
                                )} 
                            >
                                {Option.color}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Add Player</button>
            </form>
            <ul>
                <PlayerList players={players} onPlayerEdit={handelEditPlayer} onPlayerDelete={deletePlayer}></PlayerList>
            </ul>
        </>
    );
}

export default  PlayerForm;