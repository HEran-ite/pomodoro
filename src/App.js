import React, { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [theme, setTheme] = useState('light');
    const [inputTime, setInputTime] = useState('');
    
    const intervalRef = useRef(null);
    const audioRef = useRef(null); // Reference to the audio element

    // Load the audio file when the component mounts
    useEffect(() => {
        audioRef.current = new Audio('/Users/apple/Desktop/react/expense tracker/promodo/src/audio/ring.wav'); // Replace with the path to your audio file
    }, []);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0) {
                        // Stop the timer when time reaches zero
                        clearInterval(intervalRef.current);
                        setRunning(false);
                        // Play the ring sound
                        audioRef.current.play();
                        return 0; // Stop at zero
                    }
                    return prevTime - 10; // Decrease time by 10 milliseconds
                });
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [running]);

    // Handle input change
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // Validate input: only accept positive integers
        if (!isNaN(value) && value >= 0) {
            setInputTime(e.target.value);
        }
    };

    // Set timer using user input
    const handleSetTimer = () => {
        const newTime = parseInt(inputTime, 10) * 60000; // Convert minutes to milliseconds
        setTime(newTime);
    };

    return (
        <div className={`container ${theme}`}>
            <h1>Focus Dummy</h1>

            {/* Input field to set timer */}
            <div>
                <input
                    className='input'
                    type="number"
                    placeholder="Enter time in minutes"
                    value={inputTime}
                    onChange={handleInputChange}
                />
                <button onClick={handleSetTimer}>Set Timer</button>
            </div>

            <div className="timer">
                <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
            </div>

            <div>
                {running ? (
                    <button onClick={() => setRunning(false)}>Stop</button>
                ) : (
                    <button onClick={() => setRunning(true)}>Start</button>
                )}
                <button onClick={() => setTime(0)}>Reset</button>
            </div>

            <div>
                <button className="theme-button" onClick={() => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))}>
                    {theme === 'light' ? '🌚' : '🌞'}
                </button>
            </div>
        </div>
    );
}

export default App;
