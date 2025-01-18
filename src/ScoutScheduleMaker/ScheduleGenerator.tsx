//import { Button, Col, Form, Row } from "react-bootstrap";
//import { Pass } from "react-bootstrap-icons";
//import { convertNumbersToFormItem, convertStringsToFormItem } from "../Utils/HelperFunctions";
//import { useState } from "react";
//import { TimePicker } from "react-bootstrap-time-picker";



////public class ListGenerator {
////    public static void main(String[] args) throws IOException
////    {
////        String inFilePath = "C:\\Users\\Robotics\\Desktop\\ScoutingListGen\\ScoutList.txt";
////        String outFilePath = "C:\\Users\\Robotics\\Desktop\\ScoutingListGen\\FinalList.txt";
////        Scanner scanner = new Scanner(System.in);
////        CustomFileWriter fWriter = new CustomFileWriter(outFilePath);

////    System.out.println("\nDisclaimer: you need to have more than twelve people in order for this to work!");

////        //System.out.print("\nHow many scouters are there? ");
////        NameFinder x = new NameFinder();
////        int totalScouters = Integer.parseInt(x.getScoutCount(inFilePath, 2));

////    List < String > allScouters = new ArrayList<>();
////    List < String > cannotUse = new ArrayList<>();

////        //System.out.print("\nHow many groups will there be? ");
////        int numMatches = Integer.parseInt(x.getGroupCount(inFilePath, 4));
////        //System.out.print("\nHow many scouters per group do you want? ");
////        int scoutersPerMatch = Integer.parseInt(x.getScoutGroupCount(inFilePath, 6));
////********************************** */
////        int y = 1;

////    for (int i = 1; i <= totalScouters; i++)
////    {
////        allScouters.add(NameFinder.getNameByNumber(inFilePath, i));
////    }

////    for (int j = 1; j <= numMatches; j++)
////    {
////        if (j == 0) {
////            j += 1;
////        }

////        fWriter.addToNewLine("\nGroup " + j + ": \n");

////        for (int p = 0; p < scoutersPerMatch; p++)
////        {
////            if (allScouters.size() <= scoutersPerMatch) {
////                allScouters = cannotUse;
////            }

////            fWriter.addToNewLine(NameFinder.getNameByNumber(inFilePath, y));
////            cannotUse.add(allScouters.get(p));
////            allScouters.remove(allScouters.get(p));
////            y++;
////            if (y == totalScouters) {
////                y = 1;
////            }
////        }
////    }

////******************************************* */




export default function ScheduleGenerator()
{

    //const [endTimeText, setEndTimeText] = useState<string>('');
    //const [startTimeText, setStartTimeText] = useState<string>('');
    //const [groupCount, setGroupCount] = useState<number>(0);
    //const [sTRINGScouterNames, setSTRINGScouterNames] = useState<string>('');
    //const [scouterNames, setScouterNames] = useState<string[]>([]);

    //async function convertToArray(names: string)
    //{
    //    setSTRINGScouterNames(names)
    //    var array = [];
    //    array = names.split("\n"); 
    //    setScouterNames(array);
    //}

    //async function CalculateList()
    //{
    //    var y = 1
    //    let usedScouters: string[] = [];
    //    let scouterNameList: string[] = scouterNames;
    //    var numMatches = 0 //Get from website
    //    var totalScouters = scouterNames.length
    //    var scoutersPerMatch = 0 //grab from the website

    //    //for (var i = 1; i <= totalScouters; i++) //puts al the names into the list, can ignore I think
    //    {
    //    //    scouterNames.add(NameFinder.getNameByNumber(inFilePath, i));
    //    }

    //    for (var j = 1; j <= numMatches; j++)
    //    {
    //        if (j == 0)
    //        {
    //            j += 1;
    //        }

    //        fWriter.addToNewLine("\nGroup " + j + ": \n"); //add "Group: #" in text box

    //        for (var p = 0; p < scoutersPerMatch; p++)
    //        {
    //            if (scouterNames.length <= scoutersPerMatch)
    //            {
    //                scouterNameList = usedScouters;
    //            }

    //            fWriter.addToNewLine(NameFinder.getNameByNumber(inFilePath, y)); //gets name
    //            usedScouters.add(scouterNames.get(p)); //adds it to the used list
    //            scouterNames.remove(scouterNames.get(p)); //takes it off the active list
    //            y++;
    //            if (y == totalScouters)
    //            {
    //                y = 1;
    //            }
    //        }
    //    }
    //}

    //async function CalculateSlots()
    //{
        
    //}

    return (
        <div className="container w-75" >
            {/*<h3 className="text-center align-middle RRBlue">Scouter Schedule Maker</h3>*/}
                
            {/*<Row>*/}
            {/*    <Col>*/}
            {/*        */}{/*List of children scouting (or adults, we don't discriminate)*/}
            {/*        <Form.Control as="textarea" rows={20} placeholder="First_Last First_Last" value={sTRINGScouterNames} onChange={(e) => convertToArray(e.target.value)} />*/}
            {/*    </Col>*/}
            {/*    */}{/*Time Start*/}
            {/*    <Col>*/}
            {/*        */}{/*                   <Form.Control type="string" placeholder="00:00" value={startTimeText} onChange={(e) => setStartTimeText(e.target.value) } />*/}
            {/*        <TimePicker start="10:00" end="21:00" step={30} />*/}
            {/*    </Col>*/}
            {/*    */}{/*End Time*/}
            {/*    <Col>*/}
            {/*        <Form.Control type="string" placeholder="00:00" value={endTimeText} onChange={(e) => setEndTimeText(e.target.value) } />*/}
            {/*    </Col>*/}
            {/*    */}{/*Children per Group*/}
            {/*    <Col>*/}
            {/*        <Form.Control type="number" placeholder="0" value={groupCount} onChange={(e) => setGroupCount(Number(e.target.value))} />*/}
            {/*    </Col>*/}
            {/*    <Col>*/}
            {/*        <Button className="Calculate" onClick={CalculateList} >Calculate</Button>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
}