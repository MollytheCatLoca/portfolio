'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

interface UpdatePopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newValue: number) => void;
    parameter: {
        id: number;
        category: string;
        capacity_min?: number;
        value: number;
        scenarioName?: string;
    };
}

const UpdatePopup: React.FC<UpdatePopupProps> = ({ isOpen, onClose, onSave, parameter }) => {
    const [newValue, setNewValue] = useState<number>(parameter.value);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmationMessage, setConfirmationMessage] = useState<string>('');

    useEffect(() => {
        console.log("UpdatePopup rendered with parameter:", parameter);
    }, [parameter]);

    useEffect(() => {
        if (showConfirmation) {
            const timer = setTimeout(() => {
                setShowConfirmation(false);
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showConfirmation, onClose]);

    const handleSave = () => {
        console.log('Save button clicked in UpdatePopup');
        console.log('Old value:', parameter.value);
        console.log('New value:', newValue);
        console.log('Parameter ID:', parameter.id);
        console.log('Parameter Category:', parameter.category);

        onSave(newValue);

        setConfirmationMessage(`Parámetro ${parameter.category} actualizado de ${parameter.value} a ${newValue}`);
        setShowConfirmation(true);
    };

    if (!isOpen) return null;

    return (
        <div style= { styles.overlay } >
        <div style={ styles.modal }>
            {!showConfirmation ? (
                <>
                <h2 style= { styles.title } > Actualizar { parameter.category } </h2>
                    < p style = { styles.subtitle } > Min: { parameter.capacity_min } </p>
                        < p style = { styles.text } > Valor actual: { parameter.value } </p>
                            < input
    type = "number"
    style = { styles.input }
    value = { newValue }
    onChange = {(e) => {
    const value = Number(e.target.value);
    console.log('Input changed to:', value);
    setNewValue(value);
}}
            />
    < div style = { styles.buttonContainer } >
        <Button flat auto style = { styles.cancelButton } onClick = { onClose } >
            Cancelar
            </Button>
            < Button auto style = { styles.saveButton } onClick = { handleSave } >
                Guardar
                </Button>
                </div>
                </>
        ) : (
    <div style= { styles.confirmationContainer } >
    <h2 style={ styles.confirmationTitle }>¡Cambios Guardados! </h2>
        < p style = { styles.confirmationText } > { confirmationMessage } </p>
            < div style = { styles.checkmarkContainer } >
                <div style={ styles.checkmark }>✓</div>
                    </div>
                    </div>
        )}
</div>
    </div>
  );
};


const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        color: '#ffffff',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        marginBottom: '8px',
        color: '#ffffff',
    },
    subtitle: {
        fontSize: '14px',
        color: '#888888',
        marginBottom: '16px',
    },
    text: {
        marginBottom: '16px',
        fontSize: '16px',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        borderRadius: '6px',
        border: '1px solid #444444',
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        fontSize: '16px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: '#888888',
        borderColor: '#444444',
    },
    saveButton: {
        backgroundColor: '#0072F5',
        color: '#ffffff',
    },
    confirmationContainer: {
        textAlign: 'center' as 'center',
    },
    confirmationTitle: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        marginBottom: '16px',
        color: '#4CAF50',
    },
    confirmationText: {
        fontSize: '16px',
        marginBottom: '24px',
    },
    checkmarkContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#4CAF50',
        margin: '0 auto',
    },
    checkmark: {
        color: '#ffffff',
        fontSize: '36px',
    },
};

export default UpdatePopup;