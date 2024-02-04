import axios, { AxiosResponse } from "axios";
import {  useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap"
import eventContext from "../Contexts/EventContexts";
import { urlEvent } from "../endpoints";
import { storeItem } from "./LocalStorage";
import { EventDTO } from "./Utils.models";

export default function EventSelector() {
    const [events, setEvents] = useState<EventDTO[]>([]);

    const {eventCode, updateEvent } = useContext(eventContext);


    function selectEvent(eventCode: string) {
        updateEvent(eventCode);
        storeItem("eventCode", eventCode);
    }

    useEffect(() => {
        axios.get(`${urlEvent}/getevents`)
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
