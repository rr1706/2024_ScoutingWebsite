import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FormCheckType } from "react-bootstrap/esm/FormCheck";
import { formItem } from "./Utils.models";

export default function FileSelectMultiple(props: fileSelectProps) {
    const changeHandler = (event: any) => {
        props.onSelect(event.target.files);
    };

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control onChange={changeHandler} multiple type="file" />
        </Form.Group>
    )
}
interface fileSelectProps {
    onSelect(file: File[]): void;
}