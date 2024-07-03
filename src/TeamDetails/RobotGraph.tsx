import { matchDataDTO_2024 } from "../Utils/Utils.models";
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


export default function RobotGraph(props: tableProps) {


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
                text: props.matchData[0].teamNumber + ' Teleoperated Match By Match Graph',
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
                max: 30,
            },
        },
    };


    const data = {
        labels: props.matchData.map(a => a.matchNumber),
        datasets: [
            {
                label: "Amp",
                /*                data: props.matchData.map(a => Number(a.teleAmp!)),*/
                data: props.matchData.map(a => a.teleAmp),
                backgroundColor: "rgb(0, 0, 0)",

            },
            {
                label: 'Speaker',
                data: props.matchData.map(a => a.teleSpeaker),
                backgroundColor: 'rgb(0, 0, 200)',
            },
            {
                label: 'Feeds',
                data: props.matchData.map(a => a.teleFeeds),
                backgroundColor: '	rgb(200,  50,  0)',
            },
        ],
    };

    return (
        <Bar options={options} data={data} />
    )
}
interface tableProps {
    matchData: matchDataDTO_2024[];
}