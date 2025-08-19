import React from "react";
export default function HideShow(element: React.ReactElement, show: boolean)
{
    return show ? element : <></>;
}
