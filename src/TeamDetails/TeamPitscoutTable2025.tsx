import Button from "../Utils/Button";  
import { useContext, useEffect, useState } from "react";  
import { Link } from "react-router-dom";  
import { SuperScoutDataDTO } from "../SuperScoutData/SuperScoutData.model";  
import SuperScoutData from "../SuperScoutData/SuperScoutData";  
import ReactMarkdown from "react-markdown";  
  
export default function TeamPitscoutTable2025(props: tableProps) {  
  
    const [pitScouting, setPitScouting] = useState<SuperScoutDataDTO[]>();  
  
    const [drivetrain, setDrivetrain] = useState<string>();  
    const [batteryCount, setBatteryCount] = useState<number>();  
    const [batteryAge, setBatteryAge] = useState<string>();
    const [driverExperience, setDriverExperience] = useState<string>();
  
  
    useEffect(() => {  
        setPitScouting(props.superScout.filter(match => match.type === 'Pit'));  
  
        setDrivetrain(props.superScout?.find(match => match.drivetrain !== '')?.drivetrain);
        setBatteryCount(props.superScout?.filter(match => match.batteryCount !== undefined && match.batteryCount > 0).reduce((acc, item) => acc + (item.batteryCount || 0), 0));  
        setBatteryAge(props.superScout?.find(match => match.batteryAge !== '')?.batteryAge);
        setDriverExperience(props.superScout?.find(match => match.driverExperience !== '')?.driverExperience);
    }, [props.superScout]);  
  
    return (  
        <div className="table-responsive">  
  
            {(drivetrain !== undefined || batteryCount! > 0 || batteryAge !== undefined ) ?  
                <>  
                <table className="table table-striped table-bordered">  
                        <thead>  
                            <tr className="font-weight-bold">  
                            <td className="text-center align-middle"><b>Drive Train</b></td>  
                            <td className="text-center align-middle"><b>Battery Age</b></td>  
                            <td className="text-center align-middle"><b>Battery Count</b></td>
                            <td className="text-center align-middle"><b>Driver Experience</b></td>  
                        </tr>  
                    </thead>  
                        <tbody>  
                        <tr>  
                            <td className="text-center align-middle" >{drivetrain}</td>  
                            <td className="text-center align-middle" >{batteryAge}</td>  
                            <td className="text-center align-middle" >{batteryCount}</td>  
                            <td className="text-center align-middle" >{driverExperience}</td>  
                        </tr>  
                    </tbody>  
                </table>  
                    <hr></hr>  
                </>  
                : <></>  
            }  
  
            {pitScouting?.length! > 0 ?  
                <>  
                    <table className="table table-striped table-bordered">  
                        <thead>  
                            <tr className="font-weight-bold">  
                                <td className="text-center align-middle"><b>Scout</b></td>  
                                <td className="text-center align-middle"><b>Pit-Scout Notes</b></td>  
                            </tr>  
                        </thead>  
                        <tbody>  
                            {pitScouting?.map((thisItem, index) => (  
                                <tr key={index}>  
                                    <td className="text-center align-middle" >{thisItem.scoutName}</td>  
                                    <td className="text-center align-middle" ><ReactMarkdown>{thisItem.comments}</ReactMarkdown></td>  
                                </tr>  
                            ))}  
                        </tbody>  
                    </table>  
                    <hr></hr>  
                </>  
                : <></>  
            }  
        </div>  
    );  
}  
  
interface tableProps {  
    superScout: SuperScoutDataDTO[];  
}
