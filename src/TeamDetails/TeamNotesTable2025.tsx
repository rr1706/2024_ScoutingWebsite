import Button from "../Utils/Button";
import { useContext, useEffect, useState } from "react";
import { matchDataDTO_2025 } from "../Utils/Utils.models";
import { matchDataDTO } from "../TeamParser/TeamParser.model";
import { Link } from "react-router-dom";
import { SuperScoutDataDTO } from "../SuperScoutData/SuperScoutData.model";
import SuperScoutData from "../SuperScoutData/SuperScoutData";
import ReactMarkdown from "react-markdown";

export default function TeamNotesTable2025(props: tableProps) {
    const [notes, setNotes] = useState<SuperScoutDataDTO[]>();
    useEffect(() => {
        mergeNotesTables()
    }, [props.superScout, props.matchData]);
    async function mergeNotesTables() {
        let allNotes: SuperScoutDataDTO[] = []
        allNotes = [...props.superScout];
        for (var note of props.matchData) {
            console.log('hello World')
            let currentNote: SuperScoutDataDTO =
            {
                eventCode: note.eventCode,
                matchNumber: note.matchNumber,
                scoutName: note.scoutName,
                teamNumber: note.teamNumber,
                comments: note.notes,
                type: 'normal'
            }
            allNotes.push(currentNote)
            console.log(allNotes)
        }
        setNotes(allNotes);
    }
    return (
        <div className="table-responsive">
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
                    {notes?.map((thisItem, index) => (
                        <tr key={index}>
                            <td className="text-center align-middle" >{thisItem.matchNumber}</td>
                            <td className="text-center align-middle" >{thisItem.scoutName}</td>
                            {/*broke*/}
                            <td className="text-center align-middle" >{thisItem.type}</td>
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
