import { useEffect, useState } from "react";
import { TeamAveragesDTO_2025 } from "../Utils/Utils.models";




export default function AverageRow2025(props: allianceTotalProps) {    

    const redColor = '#ff5050'
    const blueColor = '#3399ff'

    const [allianceAverages, setAllianceAverages] = useState<TeamAveragesDTO_2025 | undefined>();

    useEffect(() => {
        if (props.robot1 && props.robot2 && props.robot3) {
            let totals: TeamAveragesDTO_2025 = {
                averageAutoCoral: props.robot1!.averageAutoCoral! + props.robot2!.averageAutoCoral! + props.robot3!.averageAutoCoral!,
                averageTeleCoral: props.robot1!.averageTeleCoral! + props.robot2!.averageTeleCoral! + props.robot3!.averageTeleCoral!,
                averageReefRemoval: props.robot1!.averageReefRemoval! + props.robot2!.averageReefRemoval! + props.robot3!.averageReefRemoval!,
                averageBargeAll: props.robot1!.averageBargeAll! + props.robot2!.averageBargeAll! + props.robot3!.averageBargeAll!,
                averageProcessorAll: props.robot1!.averageProcessorAll! + props.robot2!.averageProcessorAll! + props.robot3!.averageProcessorAll!,
                successfulDeepClimb: props.robot1!.successfulDeepClimb! + props.robot2!.successfulDeepClimb! + props.robot3!.successfulDeepClimb!,
                successfulShallowClimb: props.robot1!.successfulShallowClimb! + props.robot2!.successfulShallowClimb! + props.robot3!.successfulShallowClimb!,
                percentMoblilitize: (props.robot1.percentMoblilitize! + props.robot2.percentMoblilitize! + props.robot3.percentMoblilitize!),
                totalPoints: props.robot1!.totalPoints! + props.robot2!.totalPoints! + props.robot3!.totalPoints!,
                totalDeepClimb: props.robot1.totalDeepClimb! + props.robot2!.totalDeepClimb! + props.robot3!.totalDeepClimb!,
                totalShallowClimb: props.robot1.totalShallowClimb! + props.robot2!.totalShallowClimb! + props.robot3!.totalShallowClimb!
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
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}><b>        </b></td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.averageAutoCoral?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.averageTeleCoral?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.averageProcessorAll?.toFixed(1)} </td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.averageBargeAll?.toFixed(1)}</td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}><b>        </b></td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}><b>        </b></td>
            <td className="text-center align-middle" style={{ backgroundColor: props.alliance === 'red' ? redColor : blueColor }}>{allianceAverages?.totalPoints?.toFixed(1)}</td>
        </>
    )
}

interface allianceTotalProps {
    robot1: TeamAveragesDTO_2025,
    robot2: TeamAveragesDTO_2025,
    robot3: TeamAveragesDTO_2025,
    alliance: string,
}