import React, { useState } from 'react'
import "./PlayerList.css"
import { PlayerInfo } from './PlayerForm';
import { colorOptionsMap } from './PlayerForm';
import PlayerPoints from './PlayerPoints';

interface PlayerListProps {
    players: PlayerInfo[];
    onPlayerEdit: (player: PlayerInfo) => void;
    onPlayerDelete: (player: PlayerInfo) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerEdit, onPlayerDelete }) => {
    const [editingPlayer, setEditingPlayer] = useState<PlayerInfo | null>(null);

    //cancel editing func 
    const cencelEditingPlayer = () => {
        setEditingPlayer(null);
    };

    //start editing func 
    const startEditingPlayer = (player: PlayerInfo) => {
        setEditingPlayer(player);
        
    };

    //check is the player name being used 
    const isPlayerNameUnique = (nameToCheck: string, IdCheck: number) => {
        const matchingPlayers = players.filter(
            (player) =>
                player.playerName === nameToCheck && player.playerId !== IdCheck
        );
        return matchingPlayers.length === 0;
    }

    // saving player edited details func
    const saveEditingPlayer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isNameUnique = true;

        if (editingPlayer) {
            isNameUnique = isPlayerNameUnique(editingPlayer.playerName, editingPlayer.playerId);

            if (!isNameUnique) {
                alert("The name already exist")
            } else {
                onPlayerEdit(editingPlayer);
                //setEditingPlayer(editingPlayer);
                cencelEditingPlayer();
            }
            
        }
    };

    //delete player func
    const deletePlayer = (player: PlayerInfo) => {
        onPlayerDelete(player);
    }

    return (
        <>
            <h2 className="title">Player list</h2>
            <ul className="calculator">
                {players.map((player, index) => (
                    <li className="listOfPlayerContainer" key={index}>
                        <div className="playerInform">
                            <div className="playerNameL">Name: {player.playerName}</div>

                            <div className="playerColourL">Colour: {player.colorOptions.map(color => color.color)} </div>
                            <button className="editButton" onClick={() => startEditingPlayer(player)}>
                                Edit
                            </button>
                            <button className="deleteButton" onClick={() => deletePlayer(player)}>
                                Delete
                            </button>
                        </div>
                        <div className="ppContainerL">
                            <PlayerPoints></PlayerPoints>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="editFormContainer">
                {editingPlayer && (
                    <form onSubmit={saveEditingPlayer}>
                        <div>
                            <label className="editPlayerName">PlayerName: </label>
                            <input
                                type="text"
                                value={editingPlayer.playerName}
                                onChange={(event) => setEditingPlayer({ ...editingPlayer, playerName: event.target.value })}
                            />
                        </div>
                        <div>
                            <label className="editPlayerColor">PlayerColor: </label>
                            <select
                                value={editingPlayer.colorOptions.length === colorOptionsMap.length ? "" : editingPlayer.colorOptions.map(color => color.color)}
                                onChange={(event) => {
                                    const selectedColor = Array.from(event.target.selectedOptions, option => option.value);
                                    setEditingPlayer({ ...editingPlayer, colorOptions: selectedColor.map(color => ({ color, disabled: false })) });
                                }}
                            >
                                <option value="" disabled>
                                    --Please Choose a color--
                                </option>
                                {colorOptionsMap.map((Option) => (
                                    <option
                                        key={Option.color}
                                        value={Option.color}
                                        disabled={Option.disabled || players.some(p => p.colorOptions.some(color => color.color === Option.color))}
                                    >
                                        {Option.color}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button className="editSubmitButton" type="submit" >Saves</button>
                            <button className="cancelEditButton" type="button" onClick={cencelEditingPlayer}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

export default PlayerList;