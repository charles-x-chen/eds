/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { t } from 'ttag';
import { useCallback, useMemo } from 'preact/hooks';
import { usePlayerContext } from '../../Context/Player';
import { TOGGLE_PLAYER_MESSAGE } from './constants';

export const PlayerMessage = () => {
    const {
        dispatch,
        state: { showPlayerMessage },
    } = usePlayerContext();

    const closeMessage = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({
                type: TOGGLE_PLAYER_MESSAGE,
                data: null,
            });
        },
        [dispatch],
    );

    return useMemo(() => {
        const messageData = showPlayerMessage ? showPlayerMessage.data : null;
        return (
            messageData && (
                <div
                    className={`player-message__wrapper
                    ${(messageData.wrapperClass = '')}`}
                >
                    <div className="player-message__header">
                        <span className={(messageData.subtitleClass = '')}>{messageData.subtitle}</span>
                        <button className="action-close" data-role="closeBtn" onClick={closeMessage} type="button">
                            <span>{t`Close`}</span>
                        </button>
                    </div>
                    <p className={(messageData.descriptionClass = '')}>{messageData.description}</p>
                    <button
                        className={`message-action action primary
                        ${(messageData.actionClass = '')}`}
                        onClick={closeMessage}
                        name={messageData.action}
                    >
                        {messageData.action}
                    </button>
                </div>
            )
        );
    }, [showPlayerMessage, closeMessage]);
};
