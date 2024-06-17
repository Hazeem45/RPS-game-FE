import React, { useEffect, useState } from 'react';
import './styles/gameHistory.css';
import TitlePage from '../fragments/TitlePage';
import { useSidebar } from '../../utils/SidebarContext';
import axios from 'axios';
import { getLocaleDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import LoaderSpin from '../fragments/LoaderSpin';
import { useProfile } from '../../utils/UserProfileContext';
import { errorHandler } from '../../utils/errorHandler';
import PropTypes from 'prop-types';

function GameHistory({ username, gameHistory }) {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { setAlertTitle, setAlertMessage, setAlertButton, setIsAlertVisible } = useProfile();
  const { isSidebarOpen, setIsHistoryOpen } = useSidebar();
  const [matches, setMatches] = useState({
    small: window.matchMedia('(max-width: 768px)').matches,
    large: window.matchMedia('(max-width: 995px)').matches,
  });
  const [userHistory, setUserHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAPIuserHistory = async() => {
    setIsLoading(true);
    try {
      const responseAPI = await axios.get('https://rps-game-be.vercel.app/game/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserHistory(responseAPI.data);
    } catch (error) {
      setIsAlertVisible(true);
      setAlertTitle(errorHandler(error).alertTitle);
      setAlertMessage(errorHandler(error).alertMessage);
      setAlertButton(errorHandler(error).alertButton);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (location.pathname === '/dashboard/profile/history') {
      fetchAPIuserHistory();
    } else {
      if (gameHistory) {
        setUserHistory(gameHistory);
      } else {
        setIsLoading(true);
      }
    }

    const smallHandler = (e) => setMatches((prevState) => ({ ...prevState, small: e.matches }));
    const largeHandler = (e) => setMatches((prevState) => ({ ...prevState, large: e.matches }));

    const smallMediaQuery = window.matchMedia('(max-width: 768px)');
    const largeMediaQuery = window.matchMedia('(max-width: 995px)');

    smallMediaQuery.addEventListener('change', smallHandler);
    largeMediaQuery.addEventListener('change', largeHandler);
    return () => {
      smallMediaQuery.removeEventListener('change', smallHandler);
      largeMediaQuery.removeEventListener('change', largeHandler);
    };
  }, [gameHistory]);

  return (
    <div className='table-wrapper'>
      <TitlePage classForTitle={isSidebarOpen && matches.small ? 'displayNone' : ''}>{location.pathname !== '/dashboard/profile/history' && username} Game History</TitlePage>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Room</th>
            <th>Result</th>
            <th>Date</th>
            <th className={isSidebarOpen && matches.large ? 'displayNone' : 'time-column'}>Time</th>
          </tr>
        </thead>
        <tbody>
          {userHistory.map((game) => (
            <tr key={game.roomId} onClick={() => navigate(`/versus-player/${game.roomId}`)}>
              <td>{game.roomName}</td>
              <td className={game.result.toLowerCase()}>{game.result}</td>
              <td>{getLocaleDate(game.date).date}</td>
              <td className={isSidebarOpen && matches.large ? 'displayNone' : 'time-column'}>
                {`${getLocaleDate(game.date).time} 
                ${getLocaleDate(game.date).timeZone}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {userHistory.length < 1 && (
        <div className='rooms-container-2'>
          {isLoading
            ? (
            <div style={{ width: '100px', height: '100px' }}>
              <LoaderSpin />
            </div>
              )
            : (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '-50px', fontSize: '18px' }}>
              {location.pathname === '/dashboard/profile/history'
                ? (
                <div>
                  You don&apos;t have a game history yet. return to the{' '}
                  <div
                    style={{ display: 'inline', color: 'orangered', textDecoration: 'orangered underline', cursor: 'pointer' }}
                    onClick={() => {
                      setIsHistoryOpen(false);
                      if (isSidebarOpen) {
                        navigate('/dashboard/profile');
                      } else {
                        navigate('/dashboard');
                      }
                    }}
                  >
                    Dashboard
                  </div>{' '}
                  to play
                </div>
                  )
                : (
                <div>{username} don&apos;t have game history</div>
                  )}
            </div>
              )}
        </div>
      )}
    </div>
  );
}

GameHistory.propTypes = {
  username: PropTypes.string,
  gameHistory: PropTypes.arrayOf(PropTypes.object),
};

export default GameHistory;
