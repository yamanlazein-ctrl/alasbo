import type { NextConfig } from 'next'

const config: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [95],
    localPatterns: [{ pathname: '/assets/**', search: '' }],
  },
}

export default config
