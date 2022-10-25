import TableComposer from './TableComposer.js';
import Title from '../general/Title.js';
import React, {Component} from "react";
import Participant from "../data models/Participant";
import Group from "../data models/Group";
import Papa from "papaparse";


class MatchCreator extends Component {
    state = {
        participantData: [],
        groups: [],
        read_CSV: false,
        pdfCertificateBytes: null
    }

    async componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload.bind(this));

        // Preload the PDF with form fields
        const formUrl = 'certificate.pdf'
        const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
        this.setState({pdfCertificateBytes: formPdfBytes});
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    }

    beforeunload(e) {
        e.preventDefault(); //display pop up box to notify user that saved entries will be lost
        // Chrome requires returnValue to be set.
        e.returnValue = true;
    }


    render() {
        let content;
        if (this.state.read_CSV) {
            content = <TableComposer pdfFormFile={this.state.pdfCertificateBytes} participantData={this.state.participantData} groupData={this.state.groups}/>
        } else {
            content = <CsvUploadButton onLoadFunction={this.loadParticipantData}/>
        }

        return (
            <>
                <div className="container">
                    <Title msg="TournamentsApp"/>
                    <div className="pt-5 container text-center">
                        {content}
                    </div>
                </div>
            </>
        )
    }

    loadParticipantData = (loadedParticipants, loadedGroups) => {
        this.setState({
            participantData: loadedParticipants,
            groups: loadedGroups,
            read_CSV: true
        });
    }

}


function changeCSVHandler(event, onLoad) {

    if (event.target.files[0].length === 0) {
        return;
    }

    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            let participantID = 0;
            let groupID = 0;
            let participants = {};
            let groups = {};


            results.data.map((d) => {
                const participantArray = Object.values(d);

                const groupName = participantArray[0];

                if (!(groupName in groups)) {
                    // If name of group not in dict yet, add it
                    groups[groupName] = groupID++;
                }

                const par = new Participant(participantID, groups[groupName], participantArray[1], participantArray[2], participantArray[3]);
                participants[participantID] = par;
                participantID++
            });

            let groupList = [];

            for (const groupName in groups) {
                const group = new Group(groups[groupName], groupName);
                groupList.push(group);
            }


            onLoad(participants, groupList);

        },
    });
}

function CsvUploadButton(props) {
    return (
        <div className="mt-5 col-3 container">
            <label htmlFor="formFile" className="form-label"><b>Upload CSV-File</b> (<a href="/sample_csv.csv"
                                                                                        download="sample_participants_list.csv">sample
                file</a>)</label>
            <input className="form-control" type="file"
                   name="file"
                   accept=".csv"
                   onChange={(e) => changeCSVHandler(e, props.onLoadFunction)}
                   id="formFile"/>
        </div>
    );
}


export default MatchCreator;
