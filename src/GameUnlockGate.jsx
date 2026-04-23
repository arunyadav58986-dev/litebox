import React, { useEffect, useRef, useState } from "react";
import { Browser } from "@capacitor/browser";

export default function GameUnlockGate({
  url,
  requiredSeconds = 60,
  children
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState("");
  const startTimeRef = useRef(null);

  useEffect(() => {
    let listener;

    const setup = async () => {
      listener = await Browser.addListener("browserFinished", () => {
        const start = startTimeRef.current;
        if (!start) return;

        const seconds = Math.floor((Date.now() - start) / 1000);

        if (seconds >= requiredSeconds) {
          setUnlocked(true);
          setShowPopup(false);

          window.location.href = url;
        } else {
          setStatus(`Please play ${requiredSeconds - seconds} more seconds`);
        }

        startTimeRef.current = null;
      });
    };

    setup();

    return () => {
      if (listener) listener.remove();
    };
  }, [url, requiredSeconds]);

  const startGame = async () => {
    setStatus("");
    startTimeRef.current = Date.now();

    await Browser.open({
      url: "https://yourgame.com"
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (unlocked) {
      window.location.href = url;
    } else {
      setShowPopup(true);
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        {children}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center w-80">
            <h2 className="text-xl font-bold mb-2">Unlock Content</h2>
            <p className="mb-4">Play game for 1 minute to unlock this.</p>

            <button
              onClick={startGame}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Play Game
            </button>

            {status && (
              <p className="text-red-500 mt-3">{status}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
