import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
//import './assets/css/app.css'
import Provider from 'react-redux/es/components/Provider'
import ScrollToTop from './base-components/ScrollToTop'
import { store } from "./stores/store";
import "./assets/css/app.css";
import Router from './router';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <Router/>
    </Provider>
    <ScrollToTop />
  </BrowserRouter>
);
