import { ReactNode } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Button from "./Button";

export default function ConfirmationDialog(props: modalProps) {
    return (
        <Modal className='modal' show={props.showModal} onHide={props.onHide}>
            <Modal.Header  className="text-center"closeButton>
                <Modal.Title className="text-center">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Row>
                <Col className="text-center align-middle mb-3">
                    <Button className="btn btn-primary  " onClick={props.confirmOnClick} >{props.confirmText}</Button>
                </Col>
                <Col className="text-center align-middle">
                    <Button className="btn btn-danger" onClick={props.cancelOnClick} >{props.cancelText}</Button>
                </Col>
            </Row>
        </Modal>
    )
}
interface modalProps {
    title: string,
    body: ReactNode,
    showModal: boolean,
    onHide(): void,
    confirmText?: string,
    confirmOnClick?(): void,
    cancelText?: string,
    cancelOnClick?(): void,
}

