<div align="center">
    <img src="https://raw.githubusercontent.com/bobthered/chrome-extension-v3-starter/master/logo/logo-128.png"/>
    <h1>Chrome Extension v3 Starter</h1>
    <h3>MVP for injection script from pop.html</h3>
</div>

Main changes for this were:

1. [Update manifest.json](#update-manifestjson)
2. [Update popup.html](#update-popuphtml)
3. [Add popup.js](#add-popupjs)
4. [Update foreground.js](#update-foregroundjs)

## Update manifest.json

```diff
{
    // Comments are accepted in the manifest, even though it is JSON.
    "manifest_version": 3,
-    "name": "Chrome Extension v3 Starter",
+    "name": "Change Background Color",
    "description": "A minimal example of a chrome extension using manifest v3",
    "version": "0.0.1",
    "icons": {
        "16": "logo/logo-16.png",
        "48": "logo/logo-48.png",
        "128": "logo/logo-128.png"
    },
    "options_page": "settings/settings.html",
    "action": {
        "default_title": "Chrome Addon v3 Starter",
        "default_popup": "popup/popup.html"
    },
-   "permissions": [],
+   "permissions": ["scripting"],
    "host_permissions": [
        "*://*/*"
    ],
    "background": {
        "service_worker": "service-worker.js"
    },
-   "content_scripts": [{
-       "js": ["foreground.js"],
-       "matches": ["https://github.com/*"]
-   }]
}
```

## Update popup.html

```diff
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="popup.css">
    <title>Chrome Addon v3: popup</title>
+   <script src="popup.js"></script>
</head>
<body>
-   This is the <span class="special-text">HTML</span> body of the addon.
+   <button id="button">Change Background Color</button>
</body>
</html>
```

## Add popup.js

```js
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
```

## Update foreground.js

```diff
+document.body.style.backgroundColor = '#ff0000';
-// This script gets injected into any opened page
-// whose URL matches the pattern defined in the manifest
-// (see "content_script" key).
-// Several foreground scripts can be declared
-// and injected into the same or different pages.

-console.log("This prints to the console of the page (injected only if the page url matched)")

```
