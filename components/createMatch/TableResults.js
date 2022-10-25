import {PDFDocument} from 'pdf-lib';

//import fontkit from '@pdf-lib/fontkit';

function TableResults(props) {
    const columns = props.sortedResults.map((player) => {
        return (<th key={player.idPlayer} scope="col">Place {player.rank}</th>);
    });

    const sortedResultsHTML = props.sortedResults.map((player) => {
        return <td key={player.idPlayer}>{player.playerObject.fullname()} ({player.points} pts.)</td>
    });

    return (
        <>
            <thead>
            <tr>
                {columns}
                <th className="col-2" key="download" scope="col">Download</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                {sortedResultsHTML}
                <td key="download_button">
                    <button className="btn btn-primary" type="button"
                            onClick={() => downloadCertificates(props.sortedResults, props.loadedPDF)}>Download Certificates
                    </button>
                </td>
            </tr>
            </tbody>

        </>
    );
}

function download(pdfBytes, fileName, type) {
    const blob = new Blob([pdfBytes], {type: type});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

async function downloadCertificates(sortedResults, formPdfBytes) {

    for (const player of sortedResults) {

        // Load a PDF with form fields
        const pdfDoc = await PDFDocument.load(formPdfBytes)

        // Get the form containing all the fields
        const form = pdfDoc.getForm()

        // Get all fields in the PDF by their names
        const nameField = form.getTextField('name')
        const weightField = form.getTextField('weight')
        const dateField = form.getTextField('date')
        const rankingField = form.getTextField('ranking')

        const today = new Date();
        const date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();

        dateField.setText(date)
        nameField.setText(player.playerObject.fullname())
        rankingField.setText(player.rank + ".")
        weightField.setText(player.playerObject.weight + " kg")

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()


        const namePDF = "certificate_" + player.playerObject.forename + " " + player.playerObject.name + ".pdf"
        // Trigger the browser to download the PDF document
        download(pdfBytes, namePDF, "application/pdf");
    }
}

export default TableResults;