import React from 'react';
import ReactTable from "react-table";

class SubTable extends React.Component {

    constructor() {
        super();
        this.state = { childData: [], childloading: true, pagesize:5 }
        this.fetchChildData = this.fetchChildData.bind(this);
    }
    fetchChildData(row) {
        if (this.state.childloading) {
            fetch('fetch-SuiteRun-results?id='+row.original.id+'&pageNum=1&recordsperpage=10').then(res => res.json())
                .then((response) => {

                    if (response.success != undefined && response.success == "true") {
                        var newData= response.data;
                        console.log(newData.length)
                        this.setState({ childData: newData, childloading: false, pagesize:newData.length > 0?newData.length: 2  })
                    } else {
                        console.log(response.error)
                    }

                }
                )
        }

    }
    render() {
       const columns = [
            {
                Header: "Suite Name",
                accessor: "suiteName",


            },
            {
                Header: "Start Time",
                accessor: "startTime"
            },
            {
                Header: "End Time",
                accessor: "endTime"
            }
          

        ];
         const rowdata = this.props.data;
         const nState = this.state;
        return (
           
            <div style={{ padding: "20px" }}>
            Sub table for<b> {rowdata.original.id}</b>
                <br />
                <br />
                <ReactTable
                    columns={columns}
                    defaultPageSize={nState.pagesize}
                    pageSize={nState.pagesize}
                    loading={nState.childloading}
                    data={nState.childData}
                    onFetchData={this.fetchChildData(rowdata)}
                    showPagination={false}
                    className="childTable"
                />
            </div>
        );
    }
}

export default SubTable;