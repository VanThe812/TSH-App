import {
  IonAvatar,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import "./style.scss";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { App } from "@capacitor/app";
import { useDispatch } from "react-redux";
import { clearAllUserData } from "../../actions/UserAction";
const ProfilePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loadingModal] = useIonLoading(); // To show a toast message

  const userData = {
    _id: "6607f951d0cd757eb83c2466",
    fullname: "top1victory",
    dateOfBirth: 1034040000,
    address: "Address 123",
    email: "top1victory23082018@gmail.com",
    gender: "male",
    account: "top1victory",
    timecreate: 1711798609,
    timemodifile: 1711798609,
    role_id: "660786265f31905c6b79d22a",
    __v: 0,
    status_account: "forgotpass",
    timeaccess: 1711824528,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDdmOTUxZDBjZDc1N2ViODNjMjQ2NiIsImlhdCI6MTcxMTgyNDY2MCwiZXhwIjoxNzEyNDI5NDYwfQ.3Cr8tpDjG8pMNxrBLEKVFuzzpVhUwuxIc8ZmL3q0Zmc",
  };

  console.log(history)

  const handleGoToScreenInformation = (e:any) => {
    e.preventDefault();
    history.push('/personal-information');
  }
  const handleLogout = async () => {
    await loadingModal('Logout...',500,'circles')
    setTimeout(() => {
    dispatch(clearAllUserData());
    history.push('/login')
    }, 600);
  }
  // const ionRouter = useIonRouter();
  // document.addEventListener('ionBackButton', (ev:any) => {
  //   ev.detail.register(10, () => {
  //     console.log('Handler was called!');
  //     if(ionRouter.canGoBack()) {
  //       ionRouter.goBack();
  //     }
  //   });
  // });
  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-info-box">
          <IonAvatar className="profile-info-box-avatar">
            <img
              className="profile-info-box-img"
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <IonText className="profile-info-box-content">
            Hello, {userData.fullname}!
          </IonText>
        </div>
        <IonList className="profile-list">
          <IonItem lines="none" className="profile-list-item" routerLink="/profile/personal-information" detail={false}>
            <IonButton fill="outline" className="profile-list-item-button">
              <div className="profile-list-item-button-box">
              <FontAwesomeIcon icon={faUser} className="profile-list-item-button-icon" />
              <IonText className="profile-list-item-button-content">Personal information</IonText>
              </div>
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
      <IonItem lines="none">
        <div className="app-info">
        <IonText className="app-info-text">TSH</IonText>
        <IonText className="app-info-text">App versions: 1.0</IonText>
        <IonText className="app-info-text">copyright by VuVanThe</IonText>
        </div>
      </IonItem>
      <IonItem lines="none" className="profile-list-item">
            <IonButton fill="outline" className="profile-list-item-button" onClick={handleLogout}>
              <div className="profile-list-item-button-box">
              <FontAwesomeIcon icon={faRightFromBracket} className="profile-list-item-button-icon" />
              <IonText className="profile-list-item-button-content">Logout</IonText>
              </div>
            </IonButton>
          </IonItem>
      </IonFooter>
    </IonPage>
  );
};
export default ProfilePage;
