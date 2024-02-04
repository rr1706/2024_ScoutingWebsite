import { Form } from "react-bootstrap";

export default function FileSelect(props: fileSeletProps) {
    const changeHandler = (event: any) => {
        props.onSelect(event.target.files[0]);
    };

    return (
        <Form.Group controlId="formFile" className="mb-3">
            <Form.Control onChange={changeHandler} type="file" />
        </Form.Group>
    )
}
interface fileSeletProps {
    onSelect(file: File): void;
}