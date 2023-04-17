import React, { useState } from 'react'
import { PlayerInfo } from './PlayerForm';
import { colorOptions } from './PlayerForm';

interface PlayerListProps {
    players: PlayerInfo[];
    onPlayerEdit: (player: PlayerInfo) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerEdit }) => {
    const [editingPlayer, setEditingPlayer] = useState<PlayerInfo | null>(null);

    const startEditingPlayer = (player: PlayerInfo) => {
        setEditingPlayer(player);
    };

    const cencelEditingPlayer = () => {
        setEditingPlayer(null);
    };

    const saveEditingPlayer = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editingPlayer) {
            onPlayerEdit(editingPlayer);
            setEditingPlayer(editingPlayer);
            cencelEditingPlayer();
        }
    };

    return (
        <>
            <h2>Player list</h2>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player.playerName}-{player.playerColor}
                        <button onClick={() => startEditingPlayer(player)}>
                            Edit
                        </button>
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
        </>
    )
}

export default PlayerList;