import axios, { AxiosResponse } from "axios";
import {  useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap"
import eventContext from "../Contexts/EventContexts";
import { urlEvent2025 } from "../endpoints";
import { storeItem } from "./LocalStorage";
import { EventDTO, formItem } from "./Utils.models";
import TBAContext from "../Contexts/TBAContext";

export default function EventSelector() {

    const [events, setEvents] = useState<EventDTO[]>([]);

    const { eventCode, updateEvent } = useContext(eventContext);

    const { tbaCode, updatetbaCode } = useContext(TBAContext);


    function selectEvent(theEventCode: string) {
        var theTBACode = events.find(event => event.eventCode === theEventCode)?.tbaCode || "404 Code not found";
        updateEvent(theEventCode);
        updatetbaCode(theTBACode);
        storeItem("eventCode", theEventCode);
        storeItem("tbacode", theTBACode);
    }


    useEffect(() => {
        axios.get(`${urlEvent2025}/getevents`)
            .then((response: AxiosResponse<EventDTO[]>) => {
                setEvents(response.data);
            })
    }, [eventCode]);

    return (
        <>
            <Form.Select onChange={(e) => { selectEvent(e.target.value) }} value={eventCode || 'Select Event'}  >
                <option>Select Event</option>
                {events?.map(event =>
                    <option key={event.eventCode} value={event.eventCode}>{event.eventName}</option>
                )}
            </Form.Select>

        </>    
    )
}
