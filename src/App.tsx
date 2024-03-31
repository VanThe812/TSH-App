import { BrowserRouter, Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import "./theme/app.scss";
import CredentialPage from "./pages/Credential/CredentialPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPassword";
import SignUpPage from "./pages/SignUp/SignUp";
import MenuPage from "./pages/Menu/Menu";
import PersonalInformationPage from "./pages/PersonalInformation/PersonalInformation";
import { Provider } from "react-redux";
import store from "./stores";

setupIonicReact();

const App: React.FC = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <MenuPage />
        <Redirect to={"/login"} />
        {/* <CredentialPage /> */}
        {/* Redirect from root to /login */}
        {/* <Route path="/" render={() => <Redirect to="/login" />} exact />  */}
        <Route path="/forgot-password" component={ForgotPasswordPage} exact />
        <Route path="/login" component={CredentialPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Route path="/" component={MenuPage} exact />
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
