import React, { useState } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonHeader, IonToolbar, IonBackButton, IonTitle, IonButtons, IonRouterLink } from '@ionic/react';
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';


const ForgotPasswordPage: React.FC = () => {

  // Inside your component function
  const history = useHistory();
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e:any) => {
    setUsername(e.detail.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send a request to reset password
    console.log("Reset password for username:", username);
  };



  return (
    <IonPage className='forgot-password-page'>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Forgot Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <div className='forgot-password-logo-box'>
      <FontAwesomeIcon icon={faUnlockAlt} className='forgot-password-logo-icon'/>
      </div>
      <form onSubmit={handleSubmit} className='forgot-password-form'>
              <IonInput 
                label="Username" 
                labelPlacement="floating" 
                fill="outline" 
                type="text" 
                name="username"
                mode='md'
                className='forgot-password-form-item-input'
                value={username}
                onIonChange={handleUsernameChange} 
                required 
                placeholder="Enter username">
              </IonInput>
              <IonButton mode='ios' type="submit" expand="block" className="ion-margin-top" color="primary">
                Confirm
              </IonButton>
              <IonRouterLink routerLink="/login" routerDirection="back">
                <IonText className="forgot-password-form-back-to-login">
                  Back to Login
                </IonText>
              </IonRouterLink>
            </form>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ForgotPasswordPage;