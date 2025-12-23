/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // 이미지 프로토콜 (http, https)
                hostname: 'localhost', // 이미지 호스트 이름 (IP 주소 또는 도메인)
                port: '8080', // 포트 번호 (필요한 경우)
                pathname: '/**', // 허용할 경로 패턴 (모든 경로 허용 시 '/**')
            },
        ],
    },
    // 프록시 설정: 클라이언트에서 '/api/backend'로 요청하면
    // 내부적으로 'http://localhost:8080'으로 전달합니다.
    async rewrites() {
        return [
            {
                source: '/api/backend/:path*', // Next.js 앱에서 사용할 경로
                destination: 'http://localhost:8080/:path*', // 실제 백엔드 주소 (Spring Boot)
            },
        ];
    },
    experimental: { // 'experimental' 아래에 serverActions를 정의해야 합니다.
        serverActions: {
            bodySizeLimit: '40mb', // 원하는 크기로 조절하세요 (예: '50mb', '100mb')
        },
    },
    async redirects() {
        return [
            {
                source: '/product', // 사용자가 접근하려는 경로
                destination: '/product/catalog/1', // 리다이렉트될 경로
                permanent: true, // 영구적인 리다이렉트 (308 Permanent Redirect)
            },
        ];
    },
    reactStrictMode: false,
};


export default nextConfig;