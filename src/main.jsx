import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './components/GlobalStyle/GlobalStyle.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <GlobalStyle>
    <App />
  </GlobalStyle>

  // </React.StrictMode>,
)
