'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { join } from "path";


const Page = () => {
    const [formInfo, setFormInfo] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');
    const [url, setUrl] = useState('');

    const generateUrl = () => {
        const formId = formInfo.split('/').length > 1 ? formInfo.split('/')[formInfo.split('/').length - 2] : formInfo;

        const baseUrl = new URL(window.location.href);

        const url = new URL(`${baseUrl.pathname}/form-redirect?formId=${formId}&redirectUrl=${redirectUrl}`, baseUrl.origin).toString();
        setUrl(url);
    };

    return (
        <div>
            <h1>Form Flow</h1>
            <div>
                <label htmlFor="formInfo">Google Form ID or URL:</label>
                <input
                    type="text"
                    id="formInfo"
                    value={formInfo}
                    onChange={(e) => setFormInfo(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="redirectUrl">Redirect URL:</label>
                <input
                    type="text"
                    id="redirectUrl"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                />
            </div>
            <button onClick={generateUrl}>Generate URL</button>
            <p>{url}</p>
            <QRCodeCanvas value={url} size={256} level='H' marginSize={1} />
        </div>
    );
};

export default Page;