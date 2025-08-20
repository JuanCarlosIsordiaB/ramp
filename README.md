Ramp CTF Challenge
React TypeScript app that solves the Ramp Capture The Flag challenge.
Solution
Flag: sincere
How to run
bashnpm install
npm start
What it does

Fetches the flag from the hidden URL
Shows "Loading..." while fetching
Displays each letter one by one (typewriter effect)
Each letter appears in 0.5 seconds
Each letter is in its own list item

Challenge steps completed

 Found hidden URL in HTML pattern
 Created React component with TypeScript
 HTTP request using fetch API
 Typewriter effect with 500ms delay
 Rendered as list items
 No external libraries used

URL found
The script to extract the hidden URL:
javascriptfunction extractHiddenUrl() {
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
  
  return url;
}
Final URL: https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/73696e

Tech used

React
TypeScript
CSS
Fetch API
