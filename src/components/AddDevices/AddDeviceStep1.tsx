import React from "react";
import { IonButton, IonInput, IonText } from "@ionic/react";
import { AddDeviceStepProps } from "./AddDevices";

export const AddDeviceStep1: React.FC<AddDeviceStepProps> = ({
    onSubmit, errors, register, isError, setIsError,
}) => {
    return (
        <form className="add-devices-form ion-padding" onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}>
            <IonText className="add-devices-form-header">Add Device</IonText>
            <IonText className="add-devices-form-sub-header">
                Enter code of the device 123.
            </IonText>
            <IonInput
                label="Device code"
                color={errors.deviceCode ? "danger" : "light"}
                labelPlacement="floating"
                fill="outline"
                type="text"
                mode="md"
                className="signup-form-item-input add-devices-form-input"
                {...register("deviceCode", { required: true })} />
            <IonText className="add-devices-form-sub-header">
                {errors.deviceCode && "Enter code of the device."}
            </IonText>

            <IonButton type="submit">Submit</IonButton>
        </form>
    );
};
