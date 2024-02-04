import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FormCheckType } from "react-bootstrap/esm/FormCheck";
import { formItem } from "./Utils.models";

export default function RadioCheckBoxes(props: radioProps) {

    function handleChange(newSelection: string) {
        let selectedOptions: string[] = [];
        if (props.Type === "radio") {
            selectedOptions.push(newSelection);
            props.selectOptions(selectedOptions);
        } else {
            if (props.selectedOptions.includes(newSelection)) {
                selectedOptions = props.selectedOptions.filter(function (el) { return el != newSelection; });
                props.selectOptions(selectedOptions);
            }
            else {
                selectedOptions = [...props.selectedOptions];
                selectedOptions.push(newSelection);
                props.selectOptions(selectedOptions);
            }
        }
    }

    return (
        <Form>
            <div className="mb-3">
                {props.Options.map((option) => (
                    <Form.Check
                        key={option.id}
                        inline={props.inline}
                        label={option.name}
                        name={props.GroupName}
                        type={props.Type}
                        id={option.id}
                        checked={props.selectedOptions.includes(option.id)}
                        onChange={(e) => handleChange(option.id)}
                    />
                ))}
            </div>
        </Form>
    )
}
interface radioProps {
    Options: formItem[];
    GroupName: string;
    Type: FormCheckType;
    inline: boolean;
    selectedOptions: string[];
    selectOptions(options: string[]): void;
}
