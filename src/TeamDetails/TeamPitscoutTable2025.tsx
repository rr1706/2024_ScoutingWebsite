import Button from "../Utils/Button";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SuperScoutDataDTO } from "../SuperScoutData/SuperScoutData.model";
import SuperScoutData from "../SuperScoutData/SuperScoutData";
import ReactMarkdown from "react-markdown";

export default function TeamPitscoutTable2025(props: tableProps) {

    const [pitScouting, setPitScouting] = useState<SuperScoutDataDTO[]>();
    const [fullPitScouting, setFullPitScouting] = useState<SuperScoutDataDTO[]>();
    useEffect(() => {
        setPitScouting(props.superScout.filter(match => match.type === 'Pit'));

        setFullPitScouting(props.superScout.filter(match => match.drivetrain != null));
    }, [props.superScout]);

    return (
        <div className="table-responsive">

            {fullPitScouting?.length! > 0 ?
                <>
                <table className="table table-striped table-bordered">
                        <thead>
                            <tr className="font-weight-bold">
                            <td className="text-center align-middle"><b>Scout</b></td>
                                <td className="text-center align-middle"><b>Drive Train</b></td>
                                <td className="text-center align-middle"><b>Battery Age</b></td>
                                <td className="text-center align-middle"><b>Battery Count</b></td>
                        </tr>
                    </thead>
                        <tbody>
                        <tr>
                            <td className="text-center align-middle" >{fullPitScouting![0].scoutName}</td>
                            <td className="text-center align-middle" >{fullPitScouting![0].drivetrain}</td>
                            <td className="text-center align-middle" >{fullPitScouting![0].batteryAge}</td>
                            <td className="text-center align-middle" >{fullPitScouting![0].batteryCount}</td>
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
