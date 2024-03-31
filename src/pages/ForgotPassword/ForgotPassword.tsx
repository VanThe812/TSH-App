import React, { useState } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonHeader, IonToolbar, IonBackButton, IonTitle, IonButtons, IonRouterLink, useIonToast } from '@ionic/react';
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { forgotPasswordAsync } from '../../actions/UserAction';


const ForgotPasswordPage: React.FC = () => {

  // Inside your component function
  const history = useHistory();
  const dispatch = useDispatch();
  const [presentToast] = useIonToast(); // To show a toast message
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: any) => {
    console.log(e)
    setEmail(e.detail.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(email);
      const action = await dispatch(forgotPasswordAsync({ email }));
      if (forgotPasswordAsync.rejected.match(action)) {
        // If the action is rejected, handle the error
        const errorMessage = action.payload as string;
        presentToast({ message: errorMessage, duration: 3000, color:'danger' });
      } else {
        // If the dispatch is successful, show a success message and navigate to login page
        presentToast({ message: 'Password reset email sent successfully', duration: 3000,color:'success' });
        history.push('/login');
      }
    } catch (error) {
      // If there's an error, show an error message
      presentToast({ message: 'Failed to send password reset email', duration: 3000,color:'danger' });
    }
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
                label="Email" 
                labelPlacement="floating" 
                fill="outline" 
                type="email" 
                name="username"
                mode='md'
                className='forgot-password-form-item-input'
                value={email}
                onIonChange={(e) =>handleEmailChange(e)} 
                required 
                placeholder="Enter Email">
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