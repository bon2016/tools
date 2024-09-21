'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const FormPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const formId = searchParams.get('formId');
    const redirectUrl = searchParams.get('redirectUrl');

    console.log('formId:', formId);
    console.log('redirectUrl:', redirectUrl);

    // 初回表示か否かを判定するステートを定義しておく
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        // フォーム送信後のリダイレクト処理
        // const handleMessage = (event: MessageEvent) => {
        //     if (event.data === 'formSubmitted') {
        //         router.push(redirectUrl as string);
        //     }
        // };

        // window.addEventListener('message', handleMessage);

        // return () => {
        //     window.removeEventListener('message', handleMessage);
        // };
    }, [redirectUrl, router]);

    if (!formId || !redirectUrl) {
        return <p>フォーム ID またはリダイレクト URL が指定されていません。</p>;
    }

    const formUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;


    // フォーム回答後はリダイレクトさせる
    const redirectTo = () => {
        // 初回表示時はリダイレクトさせない
        if (isFirst) {
            setIsFirst(false);
            return;
        }

        console.log('redirect');

        // router.push(redirectUrl as string);
        // router.push(formUrl);
        window.location.href = redirectUrl;
        // window.location.replace(formUrl);
        // router.push(redirectUrl);
        // redirect(redirectUrl);
    };

    // window.postMessage()

    return (
        <div onLoad={redirectTo}>

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