import React, { useRef, useState } from 'react'
import Library from './components/Library';
import Nav from './components/Nav';
import Player from "./components/Player";
import Song from "./components/Song";

import data from "./data";

import './styles/app.scss'

function App() {
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const audioRef = useRef(null);
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration })
  }
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player 
        songs={songs}
        setSongs={setSongs}
        songInfo={songInfo} 
        setSongInfo={setSongInfo} 
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        audioRef={audioRef} />
      <Library 
        songs={songs} 
        setSongs={setSongs}
        setCurrentSong={setCurrentSong} 
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
        />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
