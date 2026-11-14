import { createElement } from 'react'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const outputDirectory = path.join(projectRoot, 'dist')
const projectDescription =
  "Explore Francine Jane M. Sto Domingo's React and full-stack projects for exam preparation, faculty operations, and student evaluation."
const projectTitle = 'Projects | Francine Jane M. Sto Domingo'
const projectCanonical = 'https://francinejane-jet.vercel.app/projects'

function updateTag(html, tagName, selectorName, selectorValue, attribute, value) {
  const tagPattern = new RegExp(
    `<${tagName}\\b(?=[^>]*\\b${selectorName}="${selectorValue}")[^>]*>`,
    'i',
  )
  const tag = html.match(tagPattern)?.[0]

  if (!tag) {
    throw new Error(`Could not find ${tagName}[${selectorName}="${selectorValue}"]`)
  }

  const attributePattern = new RegExp(`\\b${attribute}="[^"]*"`, 'i')
  if (!attributePattern.test(tag)) {
    throw new Error(`Could not find ${attribute} on ${tagName}[${selectorName}="${selectorValue}"]`)
  }

  return html.replace(tag, tag.replace(attributePattern, `${attribute}="${value}"`))
}

const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8')
const server = await createServer({
  configFile: path.join(projectRoot, 'vite.config.js'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const routes = [
    { path: '/', output: path.join(outputDirectory, 'index.html') },
    { path: '/projects', output: path.join(outputDirectory, 'projects', 'index.html') },
  ]

  for (const route of routes) {
    const markup = renderToString(createElement(App, { pathname: route.path }))
    const rootPattern = /<div id="root"><\/div>/
    if (!rootPattern.test(template)) {
      throw new Error('Could not find the empty #root element in the built HTML template')
    }

    let html = template.replace(rootPattern, `<div id="root">${markup}</div>`)

    if (route.path === '/projects') {
      html = html.replace(/<title>.*?<\/title>/, `<title>${projectTitle}</title>`)
      html = updateTag(html, 'link', 'rel', 'canonical', 'href', projectCanonical)
      html = updateTag(html, 'meta', 'name', 'description', 'content', projectDescription)
      html = updateTag(html, 'meta', 'property', 'og:title', 'content', projectTitle)
      html = updateTag(html, 'meta', 'property', 'og:url', 'content', projectCanonical)
      html = updateTag(html, 'meta', 'property', 'og:description', 'content', projectDescription)
      html = updateTag(html, 'meta', 'name', 'twitter:title', 'content', projectTitle)
      html = updateTag(html, 'meta', 'name', 'twitter:description', 'content', projectDescription)
      await mkdir(path.dirname(route.output), { recursive: true })
    }

    await writeFile(route.output, html)
    console.log(`Prerendered ${route.path}`)
  }
} finally {
  await server.close()
}
