document.addEventListener('DOMContentLoaded', () => {
  const buttonElem = document.getElementById('button');

  buttonElem.addEventListener('click', injectScript);
});

const injectScript = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['foreground.js'],
  });
  window.close();
};
