/* eslint-disable @typescript-eslint/no-use-before-define */
import { useContext, useEffect, useState } from "react";
import { TeamAveragesDTO_2024 } from "../Utils/Utils.models";
import axios, { AxiosResponse } from "axios";
import { urlTeamAverages2024 } from "../endpoints";
import eventContext from "../Contexts/EventContexts";
import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

export default function EventCharts() {

    ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

    const [teamAverages, setTeamAverages] = useState<TeamAveragesDTO_2024[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const { eventCode } = useContext(eventContext);

    function loadData() {
        axios.get(`${urlTeamAverages2024}/getteamaverages`, {
            params: {
                eventID: eventCode
            },
        })
            .then((response: AxiosResponse<TeamAveragesDTO_2024[]>) => {
                setTeamAverages(response.data);
            })
    }

     const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

     const data = {
        datasets: [
            {
                label:"label yo",
                //data: Array.from({ length: 100 }, () => ({
                //    x: teamAverages.map(a => a.autoTotalAvg),
                //    y: teamAverages.map(a => a.teleTotalAvg),
                //})),
                data: [
                    teamAverages?.map((item, index) => (
                        
                            {
                                x: item.autoTotalAvg,
                                y: item.teleTotalAvg
                            }
                        
                    )


                    )
                    //{ x: teamAverages.map(a => a.autoTotalAvg), y: teamAverages.map(a => a.teleTotalAvg) },
                   
                ],
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    return (<>
        <div className="container w-75" >
            <Scatter options={options} data={data} />
            <div></div>
        </div>
    </>)
}