import React, { useEffect, useState } from 'react';
import PortfolioSite from './components/PortfolioSite';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Задержка нужна для того, чтобы убедиться, что компоненты загрузились
    const loadingTimeout = setTimeout(() => {
      setLoading(false);

      // Скрываем прелоадер после загрузки компонентов
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.remove('preloader-visible');
        preloader.classList.add('preloader-hidden');

        // Полностью удаляем прелоадер после завершения анимации
        setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 500);
      }
    }, 1500); // Задержка в 1.5 секунды для демонстрации прелоадера

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Показываем основной контент только после завершения загрузки
  return (
      <>
        {!loading && <PortfolioSite />}
      </>
  );
}

export default App;