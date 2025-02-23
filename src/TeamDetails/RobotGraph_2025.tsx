import { matchDataDTO_2025 } from "../Utils/Utils.models";
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function RobotGraph_2025(props: tableProps) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        plugins: {
            title: {
                display: true,
                text: props.matchData[0].teamNumber + ' Data',
                font: {
                    size: 40,
                }
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                max: 25,
            },
        },
    };

    const data = {
        labels: props.matchData.map(a => a.matchNumber),
        datasets: [
            {
                label: "Auto L1",
                data: props.matchData.map(a => a.autoCoralL1),
                backgroundColor: "rgb(255, 204, 204)", // Lightest red
            },
            {
                label: "Auto L2",
                data: props.matchData.map(a => a.autoCoralL2),
                backgroundColor: "rgb(255, 153, 153)", // Lighter red
            },
            {
                label: "Auto L3",
                data: props.matchData.map(a => a.autoCoralL3),
                backgroundColor: "rgb(255, 102, 102)", // Darker red
            },
            {
                label: "Auto L4",
                data: props.matchData.map(a => a.autoCoralL4),
                backgroundColor: "rgb(255, 51, 51)", // Darkest red
            },
            {
                label: 'Tele L1',
                data: props.matchData.map(a => a.coralL1),
                backgroundColor: 'rgb(204, 204, 255)', // Lightest blue
            },
            {
                label: 'Tele L2',
                data: props.matchData.map(a => a.coralL2),
                backgroundColor: 'rgb(153, 153, 255)', // Lighter blue
            },
            {
                label: 'Tele L3',
                data: props.matchData.map(a => a.coralL3),
                backgroundColor: 'rgb(102, 102, 255)', // Darker blue
            },
            {
                label: 'Tele L4',
                data: props.matchData.map(a => a.coralL4),
                backgroundColor: 'rgb(51, 51, 255)', // Darkest blue
            },
            {
                label: 'Algae (Processor + Net)',
                data: props.matchData.map((a => a.autoBarge + a.barge + a.autoProcessor + a.processor)),
                backgroundColor: 'rgb(0, 128, 0)', // Green
            },
        ],
    };

    return (
        <div className="d-flex justify-content-center">
            <div style={{ width: '80%' }}>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}

interface tableProps {
    matchData: matchDataDTO_2025[];
}

