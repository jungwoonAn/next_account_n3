'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // App Router
import { useEffect } from 'react';

export default function Home() {
    const { data, status } = useSession();
    const router = useRouter();

    console.log('------------HOME----------------')
    console.log(data, status)

    useEffect(() => {
        if (data?.user?.name === 'Social') {
            router.push('/account/modify');
        }
    }, [data, status, router]);

    // 로딩 상태 처리
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return (
            <div>
                <div>Unauthenticated Status</div>
                <div><Link href={'/api/auth/signin'}>Signin</Link></div>
            </div>
        )
    }

    return (
        <div>
            <div> Index Page</div>
        </div>
    );
}