
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppWrapper from './components/AppWrapper.tsx'

// Create the root once
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Expose sitemap and ads.txt to search engines
// This is just a comment to help SEO, the actual files are in the public directory
// sitemap.xml and ads.txt will be accessible at the root level

const root = createRoot(rootElement);

// Render the app with the wrapper
root.render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
