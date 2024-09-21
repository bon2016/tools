'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const FormPage = () => {
    const searchParams = useSearchParams();

    const formId = searchParams.get('formId');
    const redirectUrl = searchParams.get('redirectUrl');

    // 初回表示か否かを判定するステートを定義しておく
    const [isFirst, setIsFirst] = useState(true);

    if (!formId || !redirectUrl) {
        return <p>フォーム ID またはリダイレクト URL が指定されていません。</p>;
    }

    const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;


    // フォーム回答後はリダイレクトさせる
    const redirect = () => {
        // 初回表示時はリダイレクトさせない
        if (isFirst) {
            setIsFirst(false);
            return;
        }

        const link = document.createElement('a');
        link.href = redirectUrl
        link.style.display = 'none';
        link.target = '_self';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // window.postMessage()

    return (
        <div onLoad={redirect}>

            <iframe
                src={formUrl}
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
            >
                読み込んでいます…
            </iframe>
        </div>
    );
};

const SuspendedFormPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <FormPage />
    </Suspense>
);

export default SuspendedFormPage;