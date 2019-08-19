import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import './index.scss'

import App from './components/App'

const Root = ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
)

export default Root;