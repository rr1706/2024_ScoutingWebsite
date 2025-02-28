import Button from "../Utils/Button";
import { useContext, useEffect, useState } from "react";
import { matchDataDTO_2025 } from "../Utils/Utils.models";
import { matchDataDTO } from "../TeamParser/TeamParser.model";
import { Link } from "react-router-dom";
import { SuperScoutDataDTO } from "../SuperScoutData/SuperScoutData.model";
import SuperScoutData from "../SuperScoutData/SuperScoutData";
import ReactMarkdown from "react-markdown";

export default function TeamNotesTable2025(props: tableProps) {
    const [mainNotes, setMainNotes] = useState<SuperScoutDataDTO[]>();
    const [preScoutNotes, setPreScoutNotes] = useState<SuperScoutDataDTO[]>();
    const [practiceNotes, setPracticeNotes] = useState<SuperScoutDataDTO[]>();
    useEffect(() => {
        mergeNotesTables();
        setPreScoutNotes(props.superScout.filter(match => match.type === 'Prescouting'));
        setPracticeNotes(props.superScout.filter(match => match.type === 'Practice'));
    }, [props.superScout, props.matchData]);
    async function mergeNotesTables() {
        let allNotes: SuperScoutDataDTO[] = []
        allNotes = props.superScout.filter(match => match.type === 'Match')
        for (var note of props.matchData) {
            let currentNote: SuperScoutDataDTO =
            {
                eventCode: note.eventCode,
                matchNumber: note.matchNumber,
                scoutName: note.scoutName,
                teamNumber: note.teamNumber,
                comments: note.notes,
                type: 'Normal'
            }
            allNotes.push(currentNote)
            console.log(allNotes)
        }
        allNotes.sort((a, b) => a.matchNumber! - b.matchNumber!)
        setMainNotes(allNotes);
    }
    function changeType(type:string) {
        if (type === 'Match') {
            return 'SuperScout'
        }
        return 'Normal'
    }
    return (
        <div className="table-responsive">

            {preScoutNotes?.length! > 0 ?
                <>
                <table className="table table-striped table-bordered">
                        <thead>
                            <tr className="font-weight-bold">
                            <td className="text-center align-middle"><b>Scout</b></td>
                            <td className="text-center align-middle"><b>Pre-Scout Notes</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {preScoutNotes?.map((thisItem, index) => (
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


            {practiceNotes?.length! > 0 ?
                <>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr className="font-weight-bold">
                        <td className="text-center align-middle"><b>Match</b></td>
                        <td className="text-center align-middle"><b>Scout</b></td>
                        <td className="text-center align-middle"><b>Practice Match Notes</b></td>
                    </tr>
                </thead>
                <tbody>
                    {practiceNotes?.map((thisItem, index) => (
                        <tr key={index}>
                            <td className="text-center align-middle" >{'p-' + thisItem.matchNumber}</td>
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

            <table className="table table-striped table-bordered">
                <thead>
                    <tr className="font-weight-bold">
                        <td className="text-center align-middle"><b>Match</b></td>
                        <td className="text-center align-middle"><b>Scout</b></td>
                        <td className="text-center align-middle"><b>Type</b></td>
                        <td className="text-center align-middle"><b>Notes</b></td>
                    </tr>
                </thead>
                <tbody>
                    {mainNotes?.map((thisItem, index) => (
                        <tr key={index}>
                            <td className="text-center align-middle" >{thisItem.matchNumber}</td>
                            <td className="text-center align-middle" >{thisItem.scoutName}</td>
                            {/*broke*/}
                            <td className="text-center align-middle" >{changeType(thisItem.type)}</td>
                            <td className="text-center align-middle" ><ReactMarkdown>{thisItem.comments}</ReactMarkdown></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

interface tableProps {
    matchData: matchDataDTO_2025[];
    superScout: SuperScoutDataDTO[];
}
