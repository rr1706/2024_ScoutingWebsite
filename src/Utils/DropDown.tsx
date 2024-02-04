import { Form } from "react-bootstrap";
import { formItem } from "./Utils.models";

export default function DropDown(props: dropDownProps) {

    return (
        <Form.Select disabled={props.disabled}  onChange={(e) => { props.selectOptions(e.target.value) }} value={props.selectedOption || props.DefaultOption} >
            <option disabled={props.disabled} value={undefined}>{props.DefaultOption}</option>
            {props.Options.map(item =>
                <option key={item.id} disabled={props.disabled} value={item.id}>{item.name}</option>
            )}
        </Form.Select>
    )
}
interface dropDownProps {
    Options: formItem[];
    DefaultOption: string;
    selectedOption?: string;
    selectOptions(options: string): void;
    disabled?: boolean
}