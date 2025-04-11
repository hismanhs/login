import { useEffect, useRef, useState } from 'react';

interface IdleOptions {
  timeout: number; // Idle timeout in milliseconds
  displayMsg: boolean; // If true, show a popup; otherwise, directly logout
  onLogout: () => void; // Callback for logout
}

const useIdleDetection = ({ timeout, displayMsg, onLogout }: IdleOptions) => {
  const [isIdle, setIsIdle] = useState(false); // Track idle state
  const idleTimer = useRef<NodeJS.Timeout | null>(null); // Timer reference

  const resetIdleTimer = () => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
    }

    // Restart the idle timer
    idleTimer.current = setTimeout(() => {
      if (displayMsg) {
        setIsIdle(true); // Show idle popup
      } else {
        onLogout(); // Directly logout
      }
    }, timeout);
  };

  useEffect(() => {
    // Add event listeners to detect user activity
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    // Start the idle timer on mount
    resetIdleTimer();

    // Cleanup event listeners and timer on unmount
    return () => {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current);
      }
      events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
    };
  }, [timeout, displayMsg, onLogout]);

  const closePopup = () => {
    setIsIdle(false); // Close the popup
    resetIdleTimer(); // Reset the idle timer
  };

  return { isIdle, closePopup };
};

export default useIdleDetection;