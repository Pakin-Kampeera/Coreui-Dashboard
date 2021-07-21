import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Button} from '../../components/index';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, {
    Search,
    CSVExport
} from 'react-bootstrap-table2-toolkit';

import data from '../../Mock/data.json';

const {SearchBar} = Search;
const {ExportCSVButton} = CSVExport;

const Table = (props) => {
    const noData = (
        <div className="d-flex justify-content-center font-weight-bold">
            <i className="fas fa-ban text-danger">
                <span className="text-dark"> No Data</span>
            </i>
        </div>
    );

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card card-success">
                        <div className="card-header">
                            {props.type === 'dashboard' ? (
                                <h3 className="card-title">Sentences</h3>
                            ) : (
                                <h3 className="card-title">Accounts</h3>
                            )}

                            <div className="float-right"></div>
                        </div>
                        <div className="card-body p-0">
                            <ToolkitProvider
                                keyField={
                                    props.type === 'dashboard'
                                        ? 'message'
                                        : 'email'
                                }
                                data={
                                    props.type === 'dashboard'
                                        ? data
                                        : props.table
                                }
                                columns={props.columns}
                                search
                            >
                                {(data) => (
                                    <div>
                                        <div className="d-inline-flex mt-2 ml-2">
                                            <SearchBar {...data.searchProps} />
                                        </div>
                                        <span className="float-right mt-2 mr-2">
                                            {props.type === 'dashboard' ? (
                                                <ExportCSVButton
                                                    {...data.csvProps}
                                                >
                                                    <i className="fas fa-print">
                                                        {'       '}
                                                        Export to CSV
                                                    </i>
                                                </ExportCSVButton>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    isLoading={props.isLoading}
                                                    className="btn btn-info"
                                                    onClick={
                                                        props.changeRoleHandler
                                                    }
                                                    disabled={
                                                        props.userRole
                                                            .length === 0 &&
                                                        props.adminRole
                                                            .length === 0
                                                    }
                                                >
                                                    Save change
                                                </Button>
                                            )}
                                        </span>
                                        <BootstrapTable
                                            {...data.baseProps}
                                            noDataIndication={noData}
                                            pagination={paginationFactory()}
                                            striped
                                            hover
                                            bordered={false}
                                            wrapperClasses="table-responsive"
                                            cellEdit={cellEditFactory({
                                                mode: 'click',
                                                blurToSave: true,
                                                beforeSaveCell:
                                                    props.beforeSaveCell
                                            })}
                                        />
                                    </div>
                                )}
                            </ToolkitProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Table;
