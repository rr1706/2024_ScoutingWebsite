import { utils, writeFile } from 'xlsx'
export default function ExportButton(props: exportProps) {


    function exportToExcel() {
        let wb = utils.book_new(),
            ws = utils.json_to_sheet(props.data);
        utils.book_append_sheet(wb, ws, props.workbookName)
        writeFile(wb, props.workbookName + "_" + Date().toLocaleString() +  ".xlsx")
    }

    return <button
        type={props.type}
        disabled={props.disabled}
        className={props.className}
        onClick={exportToExcel}
        title={props.title }

        >{props.children}</button>
}
interface exportProps {
    children: React.ReactNode;
    type: "button" | "submit";
    disabled: boolean;
    className: string;
    title?: string;

    workbookName: string;
    data: any[];
}

ExportButton.defaultProps = {
    type: "button",
    disabled: false,
    className: "btn btn-primary"
}