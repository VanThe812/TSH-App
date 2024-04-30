import React from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonIcon,
    IonText,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faDoorClosed,
    faDroplet,
    faLightbulb,
    faMicrophone,
    faPowerOff,
    faQuestion,
    faTemperatureThreeQuarters,
    faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
import { ReactSVG } from "react-svg";
import OutLetIcon from "../../assets/icons/outlet";
import classNames from "classnames";
import CircleExclamationIcon from "../../assets/icons/CircleExclamation";
interface ActionItemProps {
    actionData: {
        id: string;
        timeActionStart: string;
        timeActionEnd: string;
        name: string;
    };
}

const ActionItem: React.FC<ActionItemProps> = ({ actionData }) => {

    //temperature || door || switch || light
    return (
        <IonButton className="ion-no-padding ion-no-margin action-item" >
            <IonCard className="ion-no-margin ion-no-padding action-card">
                <div>
                    <IonText>{actionData.timeActionStart}</IonText>
                    -
                    <IonText>{actionData.timeActionEnd}</IonText>
                </div>
                <IonText class="action-card-name">{actionData.name}</IonText>
            </IonCard>
        </IonButton>
    );
};

export default ActionItem;
