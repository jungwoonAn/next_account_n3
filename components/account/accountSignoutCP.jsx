'use client'

import { signOut, useSession } from "next-auth/react"

export default function AccountSignoutCP() {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-600">세션 정보를 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md text-center">
                {!session ? (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">로그아웃되었습니다</h1>
                        <p className="text-gray-600 mb-6">다음에 또 방문해주세요.</p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">로그아웃 하시겠습니까?</h1>
                        <p className="text-gray-600 mb-6">현재 {session?.user?.email} 계정으로 로그인되어 있습니다.</p>
                        <button
                            onClick={() => signOut({ callbackUrl: '/account/signin' })}
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-colors"
                        >로그아웃</button>
                    </div>
                )}
            </div>
        </div>
    )
}