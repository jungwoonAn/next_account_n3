'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function AccountSigninCP() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClickSignin = e => {
        signIn('credentials', { username, password, callbackUrl: '/' });
    }

    const handleClickKakao = e => {
        signIn('kakao', { callbackUrl: '/' });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">로그인</h1>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">아이디 (이메일)</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********"
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleClickSignin}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
                >로그인</button>


                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500 text-sm">또는</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                    onClick={handleClickKakao}
                    className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2"
                >
                    <span>카카오로 로그인</span>
                </button>
            </div>
        </div>
    )
}