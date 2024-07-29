import { ReactNode } from "react";
import styles from "./Modal.module.css";

interface IModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: IModalProps) => {
  return <div className={styles.modal}>{children}</div>;
};
