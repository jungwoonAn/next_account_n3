import ProductEditCP from "@/components/product/productEditCP"

export default async function ProductEditPage({ params, searchParams }) {
    const param = await params

    const query = await searchParams

    const from = query.from ? decodeURIComponent(query.from) : '/product/catalog/1'

    const pno = param.pno

    console.log("pno", pno)

    const res = await fetch(`http://localhost:8080/api/products/${pno}`, {
        method: 'GET',
        cache: 'no-store',
    })
    const product = await res.json()

    console.log(product)

    return (
        <div>
            <div>Product Edit Page</div>
            <ProductEditCP product={product} from={from} />
        </div>
    )
}