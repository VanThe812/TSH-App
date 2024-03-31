import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, useIonRouter } from "@ionic/react"
import React from "react"
import './style.scss'
const AddDevicesSheet: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  return (
      <IonContent>
            <IonText>
                Add Device
            </IonText>
      </IonContent>
  )
}
export default AddDevicesSheet