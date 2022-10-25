import TableComponent from "./TableComponent.js";

function TableComposer(props) {

    const groupNumber = props.groupData.length;

    const tableComponents = [];

    for (let i = 0; i < groupNumber; i++) {
        let subData = [];
        const participants = props.participantData;
        for (let participant in participants) {
            if (participants[participant].group === i) {
                subData.push(participants[participant]);
            }
        }
        tableComponents.push(<TableComponent pdfFormFile={props.pdfFormFile} participantData={subData} group={i}
                                             groupDesc={props.groupData.find(x => x.id === i).desc}/>);
    }

    return (
        <div>{tableComponents}</div>
    )
}

export default TableComposer;
