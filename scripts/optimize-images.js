import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const assetDirectory = path.join(projectRoot, 'src', 'assets')
const publicDirectory = path.join(projectRoot, 'public')

const projectImages = [
  ['Applora.png', 'applora-project.webp'],
  ['ReviewHub.png', 'reviewhub-project.webp'],
  ['FacultyManagemenSystem.png', 'faculty-management-project.webp'],
  ['PeerHiv.png', 'peerhive-project.webp'],
]

await Promise.all(
  projectImages.map(async ([source, destination]) => {
    const output = await sharp(path.join(assetDirectory, source))
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(assetDirectory, destination))

    console.log(`${destination}: ${output.width}x${output.height}, ${output.size} bytes`)
  }),
)

await Promise.all([
  sharp(path.join(assetDirectory, 'og-image.svg'))
    .png()
    .toFile(path.join(publicDirectory, 'og-image.png')),
  sharp(path.join(assetDirectory, 'fj-logo.svg'))
    .resize(180, 180, { fit: 'contain', background: '#0f0f14' })
    .png()
    .toFile(path.join(publicDirectory, 'apple-touch-icon.png')),
])
