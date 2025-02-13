import fs from 'fs'
import path from 'path'
import pkg from '../../../package.json' // Change this path


    interface LicenseEntry {
      package: string
      license: string
    }

    const dependencies = pkg.dependencies || {}
    const licenses: LicenseEntry[] = []
    const licenseFilenames = [
      'LICENSE',
      'LICENSE.txt',
      'LICENSE.md',
      'license',
      'license.txt',
      'license.md'
    ]

    export function getLicenseText(depName) {
      const depPath = path.join('node_modules', depName)
      for (const fileName of licenseFilenames) {
        const licensePath = path.join(depPath, fileName)
        if (fs.existsSync(licensePath)) {
          return fs.readFileSync(licensePath, 'utf8')
        }
      }
      return null
    }

    for (const depName of Object.keys(dependencies)) {
      const licenseText = getLicenseText(depName)
      licenses.push({
        package: depName,
        license: licenseText || 'License text not found'
      })
    }

    //usage: console.log(JSON.stringify(licenses, null, 2))
