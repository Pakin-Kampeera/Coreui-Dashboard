import React from 'react';
import {DateTime} from 'luxon';
import {version} from '../../../../package.json';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="float-right d-none d-sm-block">
                <b>Version</b>
                <b> </b>
                <span>{version}</span>
            </div>
            <strong>
                <span>Copyright © {DateTime.now().toFormat('y')} </span>
            </strong>
            <span> </span>
            <span>All rights reserved</span>
        </footer>
    );
};

export default Footer;
