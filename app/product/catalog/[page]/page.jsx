import ProductCatalogCP from "@/components/product/productCatalogCP";

export async function generateStaticParams() {
        //한 페이지당 4개씩 카탈로그 만들기 
        // const res = await fetch(`http://localhost:8080/api/products/countCatalog?size=4`)
        // const pageCount = await res.json()

        // // [{page:'1'}, {page:'2'}...]와 같은 형태로 반환해야 함
        // const arr = []; // 빈 배열 초기화
        // for (let i = 1; i <= pageCount; i++) {
        //     arr.push({ page: String(i) }); // 배열에 i 값을 추가
        // }
        
        const arr = [{page:'1'}, {page:'2'}]

    return arr;
}


export default async function ProductCatalogPage({ params, searchParams }) {
    const param = await params;

    const pageStr = param.page || '1'
    const sizeStr = '4'

    const res = await fetch(`http://localhost:8080/api/products/list?page=${pageStr}&size=${sizeStr}`, { next: { revalidate: 60 } })  // ISR 적용

    const result = await res.json();
    console.log(result)

    const { list, total, pageRequestDTO } = result

    return (
        <div>
            <div>Product Catalog Page {pageStr}</div>

            <ProductCatalogCP
                products={list}
                total={total}
                current={pageRequestDTO.page}
                size={pageRequestDTO.size}
            >
            </ProductCatalogCP>

        </div>
    )
}