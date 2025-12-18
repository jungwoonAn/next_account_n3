import Image from "next/image"
import Link from "next/link"

export default function ProductViewCP({ product, from }) {
    console.log(product)

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
            {/* 상품 정보 컨테이너 */}
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl md:flex md:space-x-8">

                {/* 상품 이미지 영역 (왼쪽) */}
                <div className="md:w-1/2 flex flex-col items-center space-y-4">
                    {/* 메인 이미지 */}
                    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md">
                        <Image
                            src={`/api/backend/${product.fileNames[0]}`}
                            alt={product.pname}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={true}
                            className="rounded-lg"
                        />
                    </div>
                    {/* 썸네일 이미지 목록: flex-nowrap -> flex-wrap으로 변경 */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {product.fileNames.map((fileName) => (
                            <div
                                key={fileName}
                                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 border-transparent hover:border-blue-500 transition-colors duration-200`}
                            >
                                <Image
                                    src={`/api/backend/s_${fileName}`}
                                    alt={`${product.pname} thumbnail ${fileName}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="50px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 상품 상세 정보 영역 (오른쪽) */}
                <div className="md:w-1/2 mt-6 md:mt-0 space-y-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">{product.pname}</h1>
                    <p className="text-2xl font-bold text-blue-600">
                        ₩{product.price.toLocaleString()}
                    </p>

                    <div className="border-t border-b border-gray-200 py-4">
                        <p className="text-lg text-gray-700">작성자: <span className="font-semibold">{product.writer}</span></p>
                        <p className="text-sm text-gray-500">등록일: {product.createdDate}</p>
                    </div>

                    <p className="text-base text-gray-800">
                        이 상품은 {product.pname}입니다. 고급 재료를 사용하여 정성껏 만들었으며, 뛰어난 품질을 자랑합니다.
                    </p>

                    <div className="pt-4">
                        <button className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">구매하기</button>
                    </div>
                </div>
            </div>
            {/* 이전 화면 버튼 */}
            <div className="mt-8">
                <Link href={from}>
                    <button className="px-8 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200">이전 화면으로</button>
                </Link>
            </div>
        </div>
    )
}