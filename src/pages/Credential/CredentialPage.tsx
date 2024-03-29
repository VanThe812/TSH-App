import React, { useState } from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import './style.scss'
interface CredentialState {
  username: string;
  password: string;
}

const CredentialPage: React.FC = () => {
  const [credentials, setCredentials] = useState<CredentialState>({ username: '', password: '' });

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your login logic here
    console.log(credentials);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <form onSubmit={handleLogin}>
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput 
              type="text" 
              name="username"
              value={credentials.username}
              onIonChange={handleInputChange} 
              required
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput 
                type="password" 
                name="password"
                value={credentials.password}
                onIonChange={handleInputChange} 
                required
              ></IonInput>
            </IonItem>
            <IonButton type="submit" expand="block" className="ion-margin-top">
              Login
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    );
  };
  
  export default CredentialPage;