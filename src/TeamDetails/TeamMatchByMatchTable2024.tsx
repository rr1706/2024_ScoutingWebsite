import Button from "../Utils/Button";
import { matchDataDTO_2024 } from "../Utils/Utils.models";
import { useState } from "react";
import { matchDataDTO } from "../TeamParser/TeamParser.model";
import { Link } from "react-router-dom";


export default function TeamMatchByMatchTable2024(props: tableProps) {


    const [matchByMatch, setMatchByMatch] = useState<matchDataDTO[]>([]);


    const IgnoreRed = '#fd5c63'
    function getIgnore(item: matchDataDTO_2024): string {
        return item.ignore === 1 ? IgnoreRed : '#FFFFFF';
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr className="font-weight-bold">
                    <td className="text-center align-middle" ><b>Match #</b></td>
                    <td className="text-center align-middle" ><b>Auto</b></td>
                    <td className="text-center align-middle" ><b>Tele Amp</b></td>
                    <td className="text-center align-middle" ><b>Tele Speaker</b></td>
                    <td className="text-center align-middle" ><b>Total Tele</b></td>
                    <td className="text-center align-middle" ><b>Feeds</b></td>
                    <td className="text-center align-middle" ><b>Trap</b></td>
                    <td className="text-center align-middle" ><b>Climb</b></td>
                    <td className="text-center align-middle" ><b>Comments</b></td>
                    <td className="text-center align-middle" ><b>Scout</b></td>
                    <td className="text-center align-middle" ><b>Ignore</b></td>
                </tr>
            </thead>

            <tbody>
                {props.matchData?.map((item) => <tr key={item.id}>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.matchNumber}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.autoAmp + item.autoSpeaker}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.teleAmp}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.teleSpeaker}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.teleAmp + item.teleSpeaker}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.teleFeeds}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.teleTrap}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.climb}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.comment}</td>
                    <td className="text-center align-middle" style={{ backgroundColor: getIgnore(item) }} >{item.scoutName}</td>
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
    matchData: matchDataDTO_2024[];
    ignore(match: matchDataDTO_2024): void,
}