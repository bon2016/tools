'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { join } from "path";


const Page = () => {
    const [formInfo, setFormInfo] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');
    const [url, setUrl] = useState('');

    const generateUrl = () => {
        // URLの作成ロジックを実装する
        // formIdとredirectUrlを組み合わせてURLを生成する処理を記述する
        // 例: const url = `https://docs.google.com/forms/d/${formId}/viewform?usp=redirect_to=${redirectUrl}`;
        // 生成したURLをQRコードに反映させるために、QRコードコンポーネントに渡す

        console.log('formInfo:', formInfo);

        const formId = formInfo.split('/').length > 1 ? formInfo.split('/')[formInfo.split('/').length - 2] : formInfo;

        console.log('redirectUrl:', redirectUrl);

        console.log('location.href:', window.location.href);

        const url = join(window.location.href, `form-redirect?formId=${formId}&redirectUrl=${redirectUrl}`);
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
            <QRCodeCanvas value={url} size={256} level='H' marginSize={1}/>
            {/* QRコードを表示する */}
            {/* QRコードコンポーネントに生成したURLを渡す */}
            {/* 例: <QRCode value={url} /> */}
        </div>
    );
};

export default Page;