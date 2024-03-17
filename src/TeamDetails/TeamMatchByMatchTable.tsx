import { matchDataDTO } from "../TeamParser/TeamParser.model";

export default function TeamMatchByMatchTable(props: tableProps) {

    return (
        <table className="table table-striped">
            <thead>
                <tr className="font-weight-bold">
                    <td className="text-center align-middle" ><b>Match Number</b></td>
                    <td className="text-center align-middle" ><b>Starting Position</b></td>
                    <td className="text-center align-middle" ><b>Auto Low</b></td>
                    <td className="text-center align-middle" ><b>Auto Mid</b></td>
                    <td className="text-center align-middle" ><b>Auto High</b></td>
                    <td className="text-center align-middle" ><b>Total Auto</b></td>
                    <td className="text-center align-middle" ><b>Auto Engage</b></td>
                    <td className="text-center align-middle" ><b>Tele Low</b></td>
                    <td className="text-center align-middle" ><b>Tele Mid</b></td>
                    <td className="text-center align-middle" ><b>Tele High</b></td>
                    <td className="text-center align-middle" ><b>Total Tele</b></td>
                    <td className="text-center align-middle" ><b>End Engage</b></td>
                </tr>
            </thead>

            <tbody>
                {props.matchData?.map((item) => <tr key={item.id}>
                    <td className="text-center align-middle" >{item.matchNumber}</td>
                    <td className="text-center align-middle" >{item.startingPosition}</td>
                    <td className="text-center align-middle" >{item.autoLow}</td>
                    <td className="text-center align-middle" >{item.autoMid}</td>
                    <td className="text-center align-middle" >{item.autoHigh}</td>
                    <td className="text-center align-middle" >{item.autoLow + item.autoMid + item.autoHigh}</td>
                    <td className="text-center align-middle" >{item.autoChargeStation}</td>
                    <td className="text-center align-middle" >{item.teleLow}</td>
                    <td className="text-center align-middle" >{item.teleMid}</td>
                    <td className="text-center align-middle" >{item.teleHigh}</td>
                    <td className="text-center align-middle" >{item.teleLow + item.teleMid + item.teleHigh}</td>
                    <td className="text-center align-middle" >{item.endChargeStation}</td>

                </tr>)}
            </tbody>
        </table>
    )
}
interface tableProps {
    matchData: matchDataDTO[];
}
