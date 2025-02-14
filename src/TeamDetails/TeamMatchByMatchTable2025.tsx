import Button from "../Utils/Button";
import { matchDataDTO_2025 } from "../Utils/Utils.models";
import { useState } from "react";
import { matchDataDTO } from "../TeamParser/TeamParser.model";
import { Link } from "react-router-dom";


export default function TeamMatchByMatchTable2025(props: tableProps) {


    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO[]>([]);


    const IgnoreRed = '#fd5c63'
    function getIgnore(item: matchDataDTO_2025): string {
        return item.ignore === 1 ? IgnoreRed : '#FFFFFF';
    }

    function bianaryToHuman(item: number): string
    {
        if (item === 1)
        {
            return 'Yes';
        }
        else
        {
            return 'No';
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr className="font-weight-bold">
                    {/*Move Notes to its own page and expand the Match by Match Table width-wise to fit climb and scout*/}
                    <td className="text-center align-middle" ><b>Match #</b></td>
                    <td className="text-center align-middle" ><b>Molility</b></td>
                    <td className="text-center align-middle" ><b>Auto L1</b></td>
                    <td className="text-center align-middle" ><b>Auto L2</b></td>
                    <td className="text-center align-middle" ><b>Auto L3</b></td>
                    <td className="text-center align-middle" ><b>Auto L4</b></td>
                    <td className="text-center align-middle" ><b>Auto Barge</b></td>
                    <td className="text-center align-middle" ><b>Auto Processor</b></td>
                    <td className="text-center align-middle" ><b>Tele L1</b></td>
                    <td className="text-center align-middle" ><b>Tele L2</b></td>
                    <td className="text-center align-middle" ><b>Tele L3</b></td>
                    <td className="text-center align-middle" ><b>Tele L4</b></td>
                    <td className="text-center align-middle" ><b>Tele Processor</b></td>
                    <td className="text-center align-middle" ><b>Tele Barge</b></td>
                    <td className="text-center align-middle" ><b># Algae Reef</b></td>
                    <td className="text-center align-middle" ><b># Algae Floor</b></td>
                    <td className="text-center align-middle" ><b>Defence</b></td>
                    <td className="text-center align-middle" ><b>Defended</b></td>
                    <td className="text-center align-middle" ><b>Climb</b></td>
                    <td className="text-center align-middle" ><b>Scout</b></td>
                    <td className="text-center align-middle" ><b>Notes</b></td>
                    <td className="text-center align-middle" ><b>Ignore</b></td>
                </tr>
            </thead>

            <tbody>
                {props.matchData?.map((item) => <tr key={item.id}>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.matchNumber}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{bianaryToHuman(item.mobilitize)}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.autoCoralL1}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.autoCoralL2}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.autoCoralL3}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.autoCoralL4}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.autoBarge}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.autoProcessor}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.coralL1}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.coralL2}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.coralL3}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.coralL4}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.processor}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.barge}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.reefAlgae + item.autoReefAlgae}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.groundAlgae + item.autoGroundAlgae}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{bianaryToHuman(item.defence)}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{bianaryToHuman(item.defended)}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.endClimb}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.scoutName}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.notes}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }}  ><Button className="btn btn-danger btn-block btn-sm" onClick={() => props.ignore(item)} >
                        {item.ignore === 1 ? "Include" : "Exclude"}
                    </Button></td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >
                        <Link to={`/editmatch?team=${item.teamNumber}&match=${item.matchNumber}`} target="_blank">

                            <Button> Edit
                            </Button>
                        </Link>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}
interface tableProps {
    matchData: matchDataDTO_2025[];
    ignore(match: matchDataDTO_2025): void,
}