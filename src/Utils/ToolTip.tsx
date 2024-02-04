import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function ToolTip(props: toolTipProps) {
    return (
        <OverlayTrigger overlay={<Tooltip>{props.text}</Tooltip>}><img src="/QuestionMark.png" alt="image" className="toolTip" /></OverlayTrigger>
    )
}
interface toolTipProps {
    text: string
}
