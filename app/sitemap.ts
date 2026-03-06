import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quicktools.app' // Update with actual domain

  const tools = [
    '',
    '/bmi-calculator',
    '/tip-calculator',
    '/percentage',
    '/password-generator',
    '/unit-converter',
    '/color-picker',
    '/word-counter',
    '/age-calculator',
    '/about',
    '/privacy',
  ]

  return tools.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path === '/about' || path === '/privacy' ? 0.5 : 0.8,
  }))
}
