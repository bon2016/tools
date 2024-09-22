'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

const FormPage = () => {
    const searchParams = useSearchParams();

    const formId = searchParams.get('formId');
    const redirectUrl = searchParams.get('redirectUrl');
    const sessionNumber = Number(searchParams.get('sessionNumber'));

    // 初回表示か否かを判定するステートを定義しておく

    const [loadCnt, setLoadCnt] = useState(0);

    if (!formId || !redirectUrl) {
        return <p>フォーム ID またはリダイレクト URL が指定されていません。</p>;
    }

    const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;


    // フォーム回答後はリダイレクトさせる
    const redirect = () => {
        // セッション数に応じた回数読み込まれたらリダイレクト
        setLoadCnt(loadCnt + 1);
        if (loadCnt < sessionNumber) {
            return;

        }
        // リダイレクト
        window.location.href = redirectUrl

    };

    return (
        <div onLoad={redirect}>

            <iframe
                id='google-form'
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