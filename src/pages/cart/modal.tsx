// Modal.tsx
import React, { ReactNode } from 'react';
import styles from './cart.module.css'

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, children }) => {
    if (!show) return null;

    return (
        <div className={styles.container_modal}>
            {children}
        </div>
    );
};

export default Modal;
