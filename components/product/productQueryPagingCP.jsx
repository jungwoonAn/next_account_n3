import Link from "next/link";

export default function ProductQueryPagingCP({ total, requestParam }) {
    const page = requestParam.page;
    const size = requestParam.size;
    const sort = requestParam.sort;
    const keyword = requestParam.keyword;

    const queryObj = new URLSearchParams()
    queryObj.set('size', size);

    if (sort) { queryObj.set('sort', sort) }
    if (keyword) { queryObj.set('keyword', keyword) }

    const lastPage = Math.ceil(total / size)

    const start = page - 2 <= 0 ? 1 : page - 2
    const end = page + 2 > lastPage ? lastPage : page + 2

    const prev = start > 1
    const next = (end * size) < total
    const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

    return (
        <div className="flex justify-center mt-6">
            <ul className="flex items-center space-x-2">
                {/* 이전 버튼 */}
                {prev && (
                    <li>
                        <Link
                            href={`/product/query?page=${start - 1}&${queryObj.toString()}`}
                            className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                        >Prev</Link>
                    </li>
                )}

                {/* 페이지 번호 목록 */}
                {pages.map((num) => (
                    <li key={num}>
                        <Link
                            href={`/product/query?page=${num}&${queryObj.toString()}`}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
               ${page === num
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'
                                }`
                            }
                        >{num}</Link>
                    </li>
                ))}

                {/* 다음 버튼 */}
                {next && (
                    <li>
                        <Link
                            href={`/product/query?page=${end + 1}`}
                            className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
                        >Next</Link>
                    </li>
                )}
            </ul>
        </div>
    )
}