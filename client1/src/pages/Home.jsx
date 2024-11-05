// EchoBeat.jsx
import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import logo from './logo.png';
import logoTab from './logo-tab.png';
import shuffleIcon from './shufflenew.png';
import prevIcon from './prevnew.png';
import playIcon from './playnew.png';
import nextIcon from './nextnew.png';
import repeatIcon from './repeatnew.png';
import song1 from './song1.mp3';
import song2 from './song2.mp3';
import song3 from './song3.mp3';

const EchoBeat = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playlist, setPlaylist] = useState([song1, song2, song3]);
  const [songHistory, setSongHistory] = useState([]); // Stack to keep track of history
  const audioRef = useRef(new Audio(playlist[currentSongIndex])); // Reference for audio

  // Load the current song when the currentSongIndex changes
  useEffect(() => {
    audioRef.current.src = playlist[currentSongIndex];
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, isPlaying]);

  // Toggle Play/Pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Play Next Song
  const playNext = () => {
    setSongHistory([...songHistory, currentSongIndex]);
    let nextIndex;
    if (isRepeating) {
      nextIndex = (currentSongIndex + 1) % playlist.length; // Circular playback
    } else {
      nextIndex = currentSongIndex + 1 < playlist.length ? currentSongIndex + 1 : 0;
    }
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  // Play Previous Song
  const playPrevious = () => {
    if (songHistory.length > 0) {
      const previousSongIndex = songHistory.pop();
      setSongHistory([...songHistory]);
      setCurrentSongIndex(previousSongIndex);
      setIsPlaying(true);
    }
  };

  // Shuffle Playlist function using Fisher-Yates Shuffle
  const shufflePlaylist = () => {
    let shuffled = [...playlist];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPlaylist(shuffled);
    setCurrentSongIndex(0);
    setIsShuffling(true);
  };

  // Toggle Repeat Mode
  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  return (
    <>
      <header>
        <title>EchoBeat</title>
      </header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        {/* Add Navbar content */}
      </nav>

      <div className="sidebar">
        {/* Add sidebar content here if needed */}
      </div>

      <div className="musicplayer">
        <div className="album"></div>
        <div className="player">
          <div className="player-controls">
            <img src={shuffleIcon} className="player-control-icon" alt="Shuffle" onClick={shufflePlaylist} />
            <img src={prevIcon} className="player-control-icon" alt="Previous" onClick={playPrevious} />
            <img
              src={playIcon}
              className="player-control-icon play-button"
              alt={isPlaying ? "Pause" : "Play"}
              onClick={togglePlayPause}
            />
            <img src={nextIcon} className="player-control-icon" alt="Next" onClick={playNext} />
            <img src={repeatIcon} className="player-control-icon" alt="Repeat" onClick={toggleRepeat} />
          </div>
          <div className="playback-bar">
            <span className="curr-time time">0.00</span>
            <input type="range" min="0" max="100" className="progress-bar" />
            <span className="tot-time time">3.33</span>
          </div>
        </div>
        <div className="controls"></div>
      </div>
    </>
  );
};

export default EchoBeat;
