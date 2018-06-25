import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
class HomePage extends React.Component {
 constructor() {
        super();
        this.state = {
            selected: {}, selectAll: 0,
            data: [],
            subcontent: "",
            loading: false,
            dataCount: 5
        }
        this.fetchData = this.fetchData.bind(this);
        this.toggleRow = this.toggleRow.bind(this);
    }

    toggleRow(id) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[id] = !this.state.selected[id];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    toggleSelectAll() {
        let newSelected = {};

        if (this.state.selectAll === 0) {
            this.state.data.forEach(x => {
                newSelected[x.id] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0
        });
    }

    fetchData(state, instance) {
        this.setState({ loading: true });

        fetch('fetchReports?pageNum=1&recordsperpage=10').then(res => res.json())
            .then((response) => {
                if (response.success !== undefined && response.success === "true") {
                    var data = response.data;

                    this.setState({ data: data, loading: false, dataCount: data.length })
                } else {
                    this.setState({ data: [], loading: false, dataCount: 3 })
                    console.log(response.error)
                }

            }
            )
    }

    render() {
        const { data, loading, dataCount } = this.state;

        const columns = [

            /*{
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={this.state.selected[original.id] === true}
                            onChange={() => this.toggleRow(original.id)}
                        />
                    );
                },
                Header: x => {
                    return (
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={this.state.selectAll === 1}
                            ref={input => {
                                if (input) {
                                    input.indeterminate = this.state.selectAll === 2;
                                }
                            }}
                            onChange={() => this.toggleSelectAll()}
                        />
                    );
                },
                sortable: false,
                width: 45
            }, */
            {
                Header: " ",
                id: "expandercolumn",
                expander: true


            },
            /* {
                 Header: "Main Release",
                 accessor: "mainRelease"
             },
 
             {
                 Header: "Sprint",
                 accessor: "sprintRelease",
                 width: 150
 
             },*/

            {
                Header: "Build Number",
                accessor: "build",


            },
            {
                Header: "Browser",
                accessor: "browser"
            },
            {
                Header: "Total Test Scripts",
                accessor: "browser"
            },
            {
                Header: "Script percentage",
                accessor: "browser"
            },

            {
                Header: "Total Testcase",
                accessor: "browser"
            },
            {
                Header: "Testcase percentage",
                accessor: "browser"
            },

            {
                Header: "Total Time",
                accessor: "startTime"
            }
            /* {
                 Header: 'Result',
                 accessor: 'progress',
                 Cell: columnData => (
                     <div
                         style={{
                             width: '100%',
                             height: '100%',
                             backgroundColor: '#dadada',
                             borderRadius: '2px'
                         }}
                     >
                         <div title={columnData.value}
                             style={{
                                 width: `${columnData.value}%`,
                                 height: '100%',
                                 display: 'inline-block',
                                 backgroundColor: '#85cc00',
                                 borderRadius: '2px',
                                 transition: 'all .2s ease-out'
                             }}
                         />
                         <div
                             style={{
                                 width: `${(100 - columnData.value) / 2}%`,
                                 height: '100%',
                                 display: 'inline-block',
                                 backgroundColor: '#ffbf00',
                                 borderRadius: '2px',
                                 transition: 'all .2s ease-out'
                             }}
                             className='customtooltip'
                         >
                             <span class="tooltiptext">{(100 - columnData.value) / 2}%</span>
                         </div>
                         <div title={(100 - columnData.value) / 2}
                             style={{
                                 width: `${(100 - columnData.value) / 2}%`,
                                 height: '100%',
                                 display: 'inline-block',
                                 backgroundColor: '#fd0d05fa',
                                 borderRadius: '2px',
                                 transition: 'all .2s ease-out'
                             }}
                         />
                     </div>
                 )
             }, */

        ];
        return (
            <div>
                <div className="reportFilterContainer row">
                    
                    <div className="col-md-3">
                        <div className="form-group row">
                            <label htmlFor="mainRelease" className="control-label col-md-6">Main Release</label>
                            <div className="col-md-6">
                            <select id="mainRelease" name="main-release" className="form-control">
                                <option value="">All</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group row">
                            <label htmlFor="sprint" className="control-label  col-md-3">Sprint</label>
                            <div className="col-md-9">
                            <select id="sprint" name="sprint" className="form-control">
                                <option value="">All</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group row">
                            <label htmlFor="jobType" className="control-label col-md-6">Execution Type</label>
                            <div className="col-md-6">
                            <select id="jobType" name="jobType" className="form-control">
                                <option value="">All</option>
                                <option value="1">Smoke</option>
                                <option value="2">Sanity</option>
                                <option value="3">Sprint</option>
                                <option value="4">Regression</option>
                            </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                    <div className="form-group">
                    <button className="btn btn-secondary">Filter</button>
                    </div>
                    </div>
                </div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    loading={loading}
                    onFetchData={this.fetchData}
                    pageSize={dataCount}
                    pageSizeOptions= {[10, 20, 25, 50, 100]}
                    /*SubComponent={row => {
                        return (
                            <SubTable data={row} />
                        )
                    }}*/

                />
                <br />
            </div>
        );
    }
}



export default HomePage;