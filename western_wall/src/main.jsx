import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const exampleData = [
{ station: 'a', '1': true, '2': false, state: 'green' },
{ station: 'b', '1': true, '2': true, state: 'green' },
{ station: 'a', '1': true, '2': false, state: 'red' },
{ station: 'c', '1': false, '2': true, state: 'blue' },
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App data={exampleData}/>
  </StrictMode>,
)
