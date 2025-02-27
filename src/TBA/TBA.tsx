import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { matchDataDTO_2024 } from "../Utils/Utils.models";
import eventContext from "../Contexts/EventContexts";
import axios, { AxiosResponse } from "axios";
import { urlMatchData2024, urlRobotPictures, urlTBA } from "../endpoints";
import Button from "../Utils/Button";
import { TBAMatch_2025 } from "./TBA.model";
import ExportButton from "../Utils/ExportButton";
import { utils, writeFile } from "xlsx";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function TBA() {
    const [matches, setMatches] = useState<TBAMatch_2025[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function exportData() {
        setIsLoading(true);
        axios.get(`${urlTBA}/getAllMatches`)
            .then((response: AxiosResponse<TBAMatch_2025[]>) => {
                setMatches(response.data);
                exportToExcel(response.data);
                setIsLoading(false);
            });
    }

    async function exportToExcel(matches: TBAMatch_2025[]) {
        if (!matches) return;

        const headers = [
            "Match",
            "Alliance",
            "Auto Coral 1",
            "Auto Coral 2",
            "Auto Coral 3",
            "Auto Coral 4",
            "Tele Coral 1",
            "Tele Coral 2",
            "Tele Coral 3",
            "Tele Coral 4",
            "Total Auto Coral",
            "Total Tele Coral",
            "Total Processor",
            "Total Net",
            "Total Auto",
            "Total End Game",
            "Total Tele",
            "Total Points"
        ];

        const data = matches.flatMap(match => [
            {
                "Match": match.key,
                "Alliance": match.alliances.red.team_keys.join("-"),
                "Auto Coral 1": match.score_breakdown.red.autoL1,
                "Auto Coral 2": match.score_breakdown.red.autoL2,
                "Auto Coral 3": match.score_breakdown.red.autoL3,
                "Auto Coral 4": match.score_breakdown.red.autoL4,
                "Tele Coral 1": match.score_breakdown.red.teleL1,
                "Tele Coral 2": match.score_breakdown.red.teleL2,
                "Tele Coral 3": match.score_breakdown.red.teleL3,
                "Tele Coral 4": match.score_breakdown.red.teleL4,
                "Total Auto Coral": match.score_breakdown.red.autoCoralCount,
                "Total Tele Coral": match.score_breakdown.red.teleopCoralCount,
                "Total Processor": match.score_breakdown.red.wallAlgaeCount,
                "Total Net": match.score_breakdown.red.netAlgaeCount,
                "Total Auto": match.score_breakdown.red.autoPoints,
                "Total Tele": (match.score_breakdown.red.teleopPoints - match.score_breakdown.red.endGameBargePoints),
                "Total End Game": match.score_breakdown.red.endGameBargePoints,
                "Total Points": match.score_breakdown.red.totalPoints
            },
            {
                "Match": match.key,
                "Alliance": match.alliances.blue.team_keys.join("-"),
                "Auto Coral 1": match.score_breakdown.blue.autoL1,
                "Auto Coral 2": match.score_breakdown.blue.autoL2,
                "Auto Coral 3": match.score_breakdown.blue.autoL3,
                "Auto Coral 4": match.score_breakdown.blue.autoL4,
                "Tele Coral 1": match.score_breakdown.blue.teleL1,
                "Tele Coral 2": match.score_breakdown.blue.teleL2,
                "Tele Coral 3": match.score_breakdown.blue.teleL3,
                "Tele Coral 4": match.score_breakdown.blue.teleL4,
                "Total Auto Coral": match.score_breakdown.blue.autoCoralCount,
                "Total Tele Coral": match.score_breakdown.blue.teleopCoralCount,
                "Total Processor": match.score_breakdown.blue.wallAlgaeCount,
                "Total Net": match.score_breakdown.blue.netAlgaeCount,
                "Total Auto": match.score_breakdown.blue.autoPoints,
                "Total Tele": (match.score_breakdown.blue.teleopPoints - match.score_breakdown.blue.endGameBargePoints),
                "Total End Game": match.score_breakdown.blue.endGameBargePoints,
                "Total Points": match.score_breakdown.blue.totalPoints
            }
        ]);

        let wb = utils.book_new();
        let ws = utils.json_to_sheet(data, { header: headers });
        utils.book_append_sheet(wb, ws, "Matches");
        writeFile(wb, "TBAMatches_" + new Date().toLocaleString() + ".xlsx");
    }

    return (
        <Container className="my-5">
            <h3 className="text-center align-middle RRBlue mb-4">TBA</h3>
            <Row className="justify-content-center mb-4">
                <Col xs="auto">
                    <Button className="btn btn-primary" onClick={exportData}>
                        Export Matches
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <PacmanLoader
                    color={"#224195"}
                    loading={isLoading}
                    size={25}
                />
            </Row>
        </Container>
    )
}

