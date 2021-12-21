import { useState } from "react"
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

function Table({ data, tableName }) {
    let [dataTable, setDataTable] = useState(data)
    let [activePage, setActivePage] = useState(1)

    let totalDataPerPage = 10
    let [totalPage, setTotalPage] = useState(parseInt(dataTable.data.length / totalDataPerPage) + (dataTable.data.length % totalDataPerPage > 0 ? 1 : 0))

    const search = (e) => {
        setActivePage(1)
        if (e.target.value === "") {
            setDataTable(data)
            setTotalPage(parseInt(data.data.length / totalDataPerPage) + (data.data.length % totalDataPerPage > 0 ? 1 : 0))
            return
        }
        let tempDataTable = data
        let tempRowData = []
        tempDataTable.data.forEach(rowData => {
            for (const [key, value] of Object.entries(rowData)) {
                if (value.toLowerCase().includes(e.target.value)) {
                    tempRowData.push(rowData)
                    break
                }
            }

        })
        setDataTable(prevState => {
            return { ...prevState, data: tempRowData }
        })
        setTotalPage(parseInt(tempRowData.length / totalDataPerPage) + (tempRowData.length % totalDataPerPage > 0 ? 1 : 0))
    }

    const exportExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(data.data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const dataExcel = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(dataExcel, tableName + fileExtension);
    }
    return (<>
        <div class="d-flex mb-3">
            <div class="me-auto text-muted">
                <button className="btn btn-success" onClick={exportExcel}>Excel</button>
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
                            {dataTable.data.slice((activePage - 1) * totalDataPerPage, activePage * totalDataPerPage).map((row, indexRow) =>
                                <tr role="row" className="odd">
                                    {dataTable.column.map((column, indexColumn) =>
                                        <td>
                                            {
                                                column.render(row[column.key], indexRow + ((activePage - 1) * totalDataPerPage), row)
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
        <div class="card-footer row">
            <p class="text-muted col-md-6 col-sm-12">Showing <span>{(activePage - 1) * totalDataPerPage + 1}</span> to <span>{(activePage * totalDataPerPage < dataTable.data.length) ? activePage * totalDataPerPage : dataTable.data.length}</span> of <span>{dataTable.data.length}</span> entries</p>
            <ul class="pagination col-md-6 col-sm-12 justify-content-md-end justify-content-center">
                <li class={`page-item ` + (activePage === 1 ? 'disabled' : '')}>
                    <button className="page-link" tabIndex="-1" onClick={() => {
                        if (activePage > 1) {
                            setActivePage(activePage - 1)
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="15 6 9 12 15 18"></polyline></svg>

                    </button>
                </li>
                {
                    [...Array(totalPage)].map((x, i) => {
                        if (activePage - (i + 1) === 4) {
                            return <li className="page-item"><button className="page-link">..</button></li>
                        } else if (activePage === (i + 1)) {
                            return <li className="page-item active"><button className="page-link">{i + 1}</button></li>
                        } else if ((i + 1) - activePage === 4) {
                            return <li className="page-item"><button className="page-link">..</button></li>
                        } else if ((activePage - i < 4 && (i-1) < activePage) || ((i-1) - activePage < 4 && i > activePage)) {
                            return <li className="page-item" onClick={() => {
                                setActivePage(i + 1)
                            }}><button className="page-link">{i + 1}</button></li>

                        } else {
                            return <></>
                        }
                    })
                }


                <li className={`page-item ` + (activePage === totalPage ? 'disabled' : '')}>
                    <button className="page-link" onClick={() => {
                        if (activePage < totalPage) {
                            setActivePage(activePage + 1)
                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><polyline points="9 6 15 12 9 18"></polyline></svg>
                    </button>
                </li>
            </ul>
        </div>
    </>)
}

export default Table