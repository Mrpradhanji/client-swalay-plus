/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'swalay-music-files.s3-accelerate.ap-south-1.amazonaws.com',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  