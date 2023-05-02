import React, { useState } from 'react'
import "./PlayerList.css"
import { PlayerInfo } from './PlayerForm';
import { colorOptions } from './PlayerForm';
import PlayerPoints from './PlayerPoints';
import { platform } from 'os';

interface PlayerListProps {
    players: PlayerInfo[];
    onPlayerEdit: (player: PlayerInfo) => void;
    onPlayerDelete: (player: PlayerInfo) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerEdit, onPlayerDelete }) => {
    const [editingPlayer, setEditingPlayer] = useState<PlayerInfo | null>(null);

    const startEditingPlayer = (player: PlayerInfo) => {
        setEditingPlayer(player);
    };

    const cencelEditingPlayer = () => {
        setEditingPlayer(null);
    };

    const isPlayerNameUnique = (nameToCheck: string, IdCheck: number) => {
        const matchingPlayers = players.filter(
            (player) =>
                player.playerName === nameToCheck && player.playerId !== IdCheck
        );
        return matchingPlayers.length === 0;
    }

    const saveEditingPlayer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isNameUnique = true;

        if (editingPlayer) {
            isNameUnique = isPlayerNameUnique(editingPlayer.playerName, editingPlayer.playerId);

            if (!isNameUnique) {
                alert("The name already exist")
            } else {
                onPlayerEdit(editingPlayer);
                setEditingPlayer(editingPlayer);
                cencelEditingPlayer();
            }
            
        }
    };

    const deletePlayer = (player: PlayerInfo) => {
        onPlayerDelete(player);
    }

    return (
        <div className="containerL">
            <h2>Player list</h2>
            <ul className="calculator">
                {players.map((player, index) => (
                    <li className="funcButton" key={index}>
                        <div className="playerNameL">Name: {player.playerName}</div>
                        <div className="playerColourL">Colour: {player.playerColor}</div>
                        <button className= "editButton" onClick={() => startEditingPlayer(player)}>
                            Edit
                        </button>
                        <button className="deleteButton" onClick={() => deletePlayer(player)}>
                            Delete
                        </button>
                        <PlayerPoints></PlayerPoints>
                    </li>
                ))}
            </ul>
            {editingPlayer && (
                <form onSubmit={saveEditingPlayer}>
                    <div>
                        <label htmlFor="playerName">PlayerName</label>
                        <input
                            type="text"
                            value={editingPlayer.playerName}
                            onChange={(event) => setEditingPlayer({ ...editingPlayer, playerName: event.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="playerColor">PlayerColor </label>
                        <select
                            value={editingPlayer.playerColor}
                            onChange={(event) => setEditingPlayer({ ...editingPlayer, playerColor: event.target.value })}
                        >
                            <option value="" disabled>
                                --Please Choose a color--
                            </option>
                            {colorOptions.map((Option) => (
                                <option
                                    key={Option.color}
                                    value={Option.color}
                                    disabled={Option.disabled || players.some(p => p.playerColor === Option.color)}
                                >
                                    {Option.color}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit" >Saves</button>
                        <button type="button" onClick={cencelEditingPlayer}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default PlayerList;