import { matchDataDTO_2024 } from "../Utils/Utils.models";

export default function TeamMatchByMatchTable2024(props: tableProps) {

    return (
        <table className="table table-striped">
            <thead>
                <tr className="font-weight-bold">
                    <td className="text-center align-middle" ><b>Match Number</b></td>
                    <td className="text-center align-middle" ><b>Auto Speaker</b></td>
                    <td className="text-center align-middle" ><b>Auto Total</b></td>
                    <td className="text-center align-middle" ><b>Tele Amp</b></td>
                    <td className="text-center align-middle" ><b>Tele Speaker</b></td>
                    <td className="text-center align-middle" ><b>Total Tele</b></td>
                    <td className="text-center align-middle" ><b>Feeds</b></td>
                    <td className="text-center align-middle" ><b>Trap</b></td>
                    <td className="text-center align-middle" ><b>Climb</b></td>
                    <td className="text-center align-middle" ><b>Played Defense</b></td>
                    <td className="text-center align-middle" ><b>Comments</b></td>
                </tr>
            </thead>

            <tbody>
                {props.matchData?.map((item) => <tr key={item.id}>
                    <td className="text-center align-middle" >{item.matchNumber}</td>
                    <td className="text-center align-middle" >{item.autoSpeaker}</td>
                    <td className="text-center align-middle" >{item.autoAmp + item.autoSpeaker}</td>
                    <td className="text-center align-middle" >{item.teleAmp}</td>
                    <td className="text-center align-middle" >{item.teleSpeaker}</td>
                    <td className="text-center align-middle" >{item.teleAmp + item.teleSpeaker}</td>
                    <td className="text-center align-middle" >{item.teleFeeds}</td>
                    <td className="text-center align-middle" >{item.teleTrap}</td>
                    <td className="text-center align-middle" >{item.climb}</td>
                    <td className="text-center align-middle" >{item.playedDefense}</td>
                    <td className="text-center align-middle" >{item.comment}</td>

                </tr>)}
            </tbody>
        </table>
    )
}
interface tableProps {
    matchData: matchDataDTO_2024[];
}