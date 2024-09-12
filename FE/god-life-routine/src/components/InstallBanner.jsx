import React, { useState, useEffect } from 'react';

const InstallBanner = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log("설치가능한상태입니다.");
      setInstallPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
      return;
    }
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('사용자가 설치를 수락했습니다');
      } else {
        console.log('사용자가 설치를 거부했습니다');
      }
      setInstallPrompt(null);
      setShowBanner(false);
    });
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="install-banner fixed bottom-0 w-full">
      <p>이 앱을 설치하시겠습니까?</p>
      <div className='flex justify-around'>
        <button className='bg-orange-500 text-white p-2 rounded-md' onClick={handleInstallClick}>설치</button>
        <button className='bg-gray-500 text-white p-2 rounded-md' onClick={() => setShowBanner(false)}>나중에</button>
      </div>
    </div>
  );
};

export default InstallBanner;