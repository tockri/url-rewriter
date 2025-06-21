import { createRoot } from 'react-dom/client';
import { App } from './components/App';

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
  } catch (error) {
    console.error('Error rendering React app:', error);
    container.innerHTML = '<div style="color: red;">エラーが発生しました: ' + error + '</div>';
  }
} else {
  console.error('Root element not found');
}