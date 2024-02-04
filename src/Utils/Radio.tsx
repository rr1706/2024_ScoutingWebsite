import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FormCheckType } from "react-bootstrap/esm/FormCheck";
import { formItem } from "./Utils.models";

export default function Radio(props: radioProps) {
    return (
        <div className="mb-3">
        <Form>
                {props.Options.map((option) => (
                <Form.Check
                    key={option.id}
                    inline={props.inline}
                    label={option.name}
                    name={option.name}
                    type={"radio"}
                    id={props.GroupName + "_" + option.id}
                    checked={props.selectedOption === option.id}
                    onChange={(e) => props.selectOptions(option.id)}
                />                        
            ))}
            </Form>
        </div>
    )
}
interface radioProps {
    Options: formItem[];
    GroupName: string;
    inline: boolean;
    selectedOption?: string;
    selectOptions(options: string): void;
}
