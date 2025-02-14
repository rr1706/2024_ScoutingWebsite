 import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

export default function RRModal(props: modalProps) {
    return (
        <Modal fullscreen={true}  className='modal-xl' show={props.showModal} onHide={props.onHide}>
            <Modal.Header  className="text-center"closeButton>
                <Modal.Title className="text-center">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>

        </Modal>
    )
}
interface modalProps {
    title: string,
    body: ReactNode,
    showModal: boolean,
    onHide(): void,
    button1Text?: string,
    button1OnClick?(): void,
    button2Text?: string,
    button2OnClick?(): void,
}

