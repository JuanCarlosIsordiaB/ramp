import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [flag, setFlag] = useState<string>('');
  const [displayedFlag, setDisplayedFlag] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const flagUrl: string = 'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/73696e';

  useEffect(() => {
    const fetchFlag = async (): Promise<void> => {
      try {
        setLoading(true);
        const response: Response = await fetch(flagUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const flagText: string = await response.text();
       
        let cleanFlag: string = flagText.trim();
        
        
        cleanFlag = cleanFlag.replace(/undefined/gi, '');
        cleanFlag = cleanFlag.replace(/null/gi, '');
        cleanFlag = cleanFlag.replace(/\0/g, '');
        
        console.log('Final flag set:', JSON.stringify(cleanFlag));
        setFlag(cleanFlag);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchFlag();
  }, [flagUrl]);

  useEffect(() => {
    if (flag && !loading && flag !== '') {
      setDisplayedFlag(''); 
      let currentIndex = 0;
      
      console.log('Starting typewriter effect with flag:', JSON.stringify(flag));
      
      const typewriterInterval: NodeJS.Timeout = setInterval(() => {
        if (currentIndex < flag.length) {
          const charToAdd = flag[currentIndex];
          console.log(`Adding character ${currentIndex}: "${charToAdd}"`);
          setDisplayedFlag(prev => {
            const newValue = prev + charToAdd;
            console.log(`New displayedFlag: "${newValue}"`);
            return newValue;
          });
          currentIndex++;
        } else {
          console.log('Typewriter effect completed');
          clearInterval(typewriterInterval);
        }
      }, 500); 

      return () => {
        console.log('Cleaning up typewriter interval');
        clearInterval(typewriterInterval);
      };
    }
  }, [flag, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!flag || flag === '') {
    return <div>No flag received</div>;
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Ramp CTF Challenge</h1>
        <div className="flag-container">
          <h2 className="flag-name-title ">Juan Carlos Isordia Betancourt  </h2>
          <a className='flag-github-link' href="https://github.com/JuanCarlosIsordiaB/ramp" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
          <h2 className="flag-title">Flag Captured</h2>
          <ul className="flag-display">
            {Array.from(displayedFlag).map((char: string, index: number) => (
              <li key={index} className="flag-char" style={{ animationDelay: `${index * 0.5}s` }}>
                {char}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

/*


function extractHiddenUrl(): string {
  const sections = document.querySelectorAll('section[data-id^="92"]');
  let url = '';
  
  sections.forEach(section => {
    const article = section.querySelector('article[data-class*="45"]');
    if (article) {
      const div = article.querySelector('div[data-tag*="78"]');
      if (div) {
        const b = div.querySelector('b.ref[value]');
        if (b) {
          url += b.getAttribute('value') || '';
        }
      }
    }
  });
  
  console.log('URL :', url);
  return url;
}

extractHiddenUrl();
*/