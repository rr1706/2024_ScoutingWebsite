import { useEffect, useState } from "react";
import { TeamAveragesDTO_2024 } from "../Utils/Utils.models";




export default function AverageRow2024(props: allianceTotalProps) {    

    const redColor = '#ff5050'
    const blueColor = '#3399ff'

    const [allianceAverages, setAllianceAverages] = useState<TeamAveragesDTO_2024 | undefined>();

    useEffect(() => {
        if (props.robot1 && props.robot2 && props.robot3) {
            let totals: TeamAveragesDTO_2024 = {
                autoAmpAvg: props.robot1!.autoAmpAvg! + props.robot2!.autoAmpAvg! + props.robot3!.autoAmpAvg!,
                autoSpeakerAvg: props.robot1!.autoSpeakerAvg! + props.robot2!.autoSpeakerAvg! + props.robot3!.autoSpeakerAvg!,
                teleAmpAvg: props.robot1!.teleAmpAvg! + props.robot2!.teleAmpAvg! + props.robot3!.teleAmpAvg!,
                teleSpeakerAvg: props.robot1!.teleSpeakerAvg! + props.robot2!.teleSpeakerAvg! + props.robot3!.teleSpeakerAvg!,
                teleTrapAvg: props.robot1!.teleTrapAvg! + props.robot2!.teleTrapAvg! + props.robot3!.teleTrapAvg!,
                teleTotalAvg: props.robot1!.teleTotalAvg! + props.robot2!.teleTotalAvg! + props.robot3!.teleTotalAvg!,
                climbSuccessRate: (props.robot1.climbSuccessRate! + props.robot2.climbSuccessRate! + props.robot3.climbSuccessRate!) / 100,
                totalPoints: props.robot1!.totalPoints! + props.robot2!.totalPoints! + props.robot3!.totalPoints!,
                feedAvg: props.robot1.feedAvg! + props.robot2!.feedAvg! + props.robot3!.feedAvg!
            }
            setAllianceAverages(totals);
        }
        else {
            setAllianceAverages(undefined);
        }

    }, [props.robot1, props.robot2, props.robot3]);



    return (
        <>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}><b>Alliance</b></td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.autoAmpAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.autoSpeakerAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.teleAmpAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.teleSpeakerAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.teleTrapAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.teleTotalAvg?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.climbSuccessRate?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.totalPoints?.toFixed(1)}</td>
        </>
    )
}

interface allianceTotalProps {
    robot1: TeamAveragesDTO_2024,
    robot2: TeamAveragesDTO_2024,
    robot3: TeamAveragesDTO_2024,
    alliance: string,
}