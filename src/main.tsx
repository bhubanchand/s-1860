
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppWrapper from './components/AppWrapper.tsx'

// Create the root once
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// Render the app with the wrapper
root.render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
