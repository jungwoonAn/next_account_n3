import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProductLayout({ children }) {
    const session = await getServerSession(authOptions);

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <div className="text-xl font-bold">
                        <Link href="/">로고</Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/product" className="text-gray-700 hover:text-blue-600 font-medium">상품 카탈로그</Link>
                        {!session &&
                            <Link href="/account/signin" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">로그인</Link>
                        }
                        {session &&
                            <Link href="/account/signout" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">로그아웃</Link>
                        }
                    </nav>
                </div>
            </header>
            {/* 콘텐츠의 최대 너비를 768px로 설정하고 중앙 정렬 */}
            <main className="pt-20 max-w-xl mx-auto">
                {children}
            </main>
        </>
    )
}