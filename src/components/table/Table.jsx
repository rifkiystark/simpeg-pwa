import { useState } from "react"


function Table({ data }) {
    let [dataTable, setDataTable] = useState(data)

    const search = (e) => {
        if (e.target.value === "") {
            setDataTable(data)
            return
        }
        let tempDataTable = data
        let tempRowData = []
        tempDataTable.data.forEach(rowData => {
            for (const [value] of Object.entries(rowData)) {
                if (value.toLowerCase().includes(e.target.value)) {
                    tempRowData.push(rowData)
                    break
                }
            }

        })
        setDataTable(prevState => {
            return { ...prevState, data: tempRowData }
        })
    }
    return (<>
        <div class="d-flex mb-3">
            <div class="me-auto text-muted">
                <button className="btn btn-success">Excel</button>
            </div>
            <div class="ms-auto text-muted">
                Search:
                <div class="ms-2 d-inline-block">
                    <input type="text" class="form-control" aria-label="Search invoice" onChange={search} />
                </div>
            </div>
        </div>
        <div className="table-responsive">
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-bordered card-table table-vcenter text-nowrap datatable">
                        <thead>
                            <tr role="row">
                                {dataTable.column.map(column =>
                                    <th>
                                        {column.name}
                                    </th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {dataTable.data.map((row, indexRow) =>
                                <tr role="row" className="odd">
                                    {dataTable.column.map((column, indexColumn) =>
                                        <td>
                                            {
                                                column.render(row[column.key], indexRow, row)
                                            }
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}

export default Table