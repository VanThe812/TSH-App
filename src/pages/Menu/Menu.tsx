import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router";
import { useLocation } from 'react-router-dom';
import "./style.scss";
import HomePage from "../Home/Home";
import RoomsPage from "../Rooms/Rooms";
import AutomationPage from "../Automation/Automation";
import ProfilePage from "../Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorClosed, faHouse, faUser, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { IonReactRouter } from "@ionic/react-router";
import PersonalInformationPage from "../PersonalInformation/PersonalInformation";
import AddDevicesPage from "../AddDevices/AddDevices";
import classNames from "classnames";

const MenuPage: React.FC = () => {
  // Inside your component function
  const history = useHistory();
  const [username, setUsername] = useState("");
  const location = useLocation();
  const [showTabs, setShowTabs] = useState<boolean>(false);
  console.log(location,window.location.href)
  const handleUsernameChange = (e: any) => {
    setUsername(e.detail.value);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send a request to reset password
    console.log("Reset password for username:", username);
  };

  return (
    <IonReactRouter>
      {/* <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader> */}
      <IonTabs className="menu-tab">
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" component={HomePage} exact />
          <Route path="/rooms" component={RoomsPage} exact />
          <Route path="/automation" component={AutomationPage} exact />
          <Route path="/profile/personal-information" component={PersonalInformationPage} exact />
          <Route path="/profile" component={ProfilePage} exact />
        <Route path="/add-devices" component={AddDevicesPage} exact />

        </IonRouterOutlet>
        <IonTabBar selectedTab="home" className={classNames("menu-tab-bar")} slot="bottom">
          <IonTabButton className="menu-tab-bar-button" tab="home" href="/home">
            <FontAwesomeIcon className="menu-tab-bar-button-icon" icon={faHouse} />
            <IonLabel className="menu-tab-bar-button-label">Home</IonLabel>
          </IonTabButton>
          <IonTabButton className="menu-tab-bar-button" tab="rooms" href="/rooms">
          <FontAwesomeIcon className="menu-tab-bar-button-icon" icon={faDoorClosed} />
            <IonLabel className="menu-tab-bar-button-label">Room</IonLabel>
          </IonTabButton>
          <IonTabButton className="menu-tab-bar-button" tab="automation" href="/automation">
          <FontAwesomeIcon className="menu-tab-bar-button-icon" icon={faWandMagicSparkles} />
            <IonLabel className="menu-tab-bar-button-label">Automation</IonLabel>
          </IonTabButton>
          <IonTabButton className="menu-tab-bar-button" tab="profile" href="/profile">
          <FontAwesomeIcon className="menu-tab-bar-button-icon" icon={faUser} />
            <IonLabel className="menu-tab-bar-button-label">Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default MenuPage;
