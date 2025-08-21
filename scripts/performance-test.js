#!/usr/bin/env node

/**
 * Performance testing script using Lighthouse CI
 * Run: node scripts/performance-test.js
 */

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const fs = require('fs')
const path = require('path')

// Configuration
const config = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
    },
  },
}

// URLs to test
const urls = [
  'http://localhost:3000/en',
  'http://localhost:3000/en/blog',
  'http://localhost:3000/en/courses',
  'http://localhost:3000/en/contact',
  'http://localhost:3000/en/blog/binary-search-algorithm',
]

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  }

  const runnerResult = await lighthouse(url, options, config)
  await chrome.kill()

  return runnerResult
}

async function generateReport() {
  console.log('🚀 Starting performance tests...\n')
  
  const results = []
  
  for (const url of urls) {
    console.log(`Testing: ${url}`)
    
    try {
      const result = await runLighthouse(url)
      const scores = {
        url,
        performance: Math.round(result.lhr.categories.performance.score * 100),
        accessibility: Math.round(result.lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(result.lhr.categories['best-practices'].score * 100),
        seo: Math.round(result.lhr.categories.seo.score * 100),
        metrics: {
          fcp: result.lhr.audits['first-contentful-paint'].numericValue,
          lcp: result.lhr.audits['largest-contentful-paint'].numericValue,
          cls: result.lhr.audits['cumulative-layout-shift'].numericValue,
          tti: result.lhr.audits['interactive'].numericValue,
          speedIndex: result.lhr.audits['speed-index'].numericValue,
        }
      }
      
      results.push(scores)
      
      console.log(`  ✅ Performance: ${scores.performance}`)
      console.log(`  ✅ Accessibility: ${scores.accessibility}`)
      console.log(`  ✅ Best Practices: ${scores.bestPractices}`)
      console.log(`  ✅ SEO: ${scores.seo}`)
      console.log(`  📊 FCP: ${Math.round(scores.metrics.fcp)}ms`)
      console.log(`  📊 LCP: ${Math.round(scores.metrics.lcp)}ms`)
      console.log(`  📊 CLS: ${scores.metrics.cls.toFixed(3)}`)
      console.log('')
      
    } catch (error) {
      console.error(`  ❌ Failed to test ${url}:`, error.message)
    }
  }
  
  // Generate summary report
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const reportPath = path.join(__dirname, '..', 'performance-reports', `report-${timestamp}.json`)
  
  // Ensure reports directory exists
  const reportsDir = path.dirname(reportPath)
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  
  // Print summary
  console.log('📋 PERFORMANCE SUMMARY')
  console.log('='.repeat(50))
  
  const averages = results.reduce((acc, result) => {
    acc.performance += result.performance
    acc.accessibility += result.accessibility
    acc.bestPractices += result.bestPractices
    acc.seo += result.seo
    return acc
  }, { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 })
  
  const count = results.length
  console.log(`Average Performance: ${Math.round(averages.performance / count)}`)
  console.log(`Average Accessibility: ${Math.round(averages.accessibility / count)}`)
  console.log(`Average Best Practices: ${Math.round(averages.bestPractices / count)}`)
  console.log(`Average SEO: ${Math.round(averages.seo / count)}`)
  
  console.log(`\n📁 Detailed report saved to: ${reportPath}`)
  
  // Check if scores meet targets
  const targets = { performance: 90, accessibility: 90, bestPractices: 90, seo: 90 }
  const avgScores = {
    performance: Math.round(averages.performance / count),
    accessibility: Math.round(averages.accessibility / count),
    bestPractices: Math.round(averages.bestPractices / count),
    seo: Math.round(averages.seo / count),
  }
  
  let allTargetsMet = true
  console.log('\n🎯 TARGET ANALYSIS')
  console.log('='.repeat(50))
  
  Object.keys(targets).forEach(category => {
    const score = avgScores[category]
    const target = targets[category]
    const status = score >= target ? '✅' : '❌'
    console.log(`${status} ${category}: ${score}/${target}`)
    if (score < target) allTargetsMet = false
  })
  
  if (allTargetsMet) {
    console.log('\n🎉 All performance targets met!')
    process.exit(0)
  } else {
    console.log('\n⚠️  Some performance targets not met. Consider optimizations.')
    process.exit(1)
  }
}

// Check if server is running
async function checkServer() {
  try {
    const fetch = (await import('node-fetch')).default
    await fetch('http://localhost:3000')
    return true
  } catch {
    return false
  }
}

async function main() {
  const serverRunning = await checkServer()
  if (!serverRunning) {
    console.error('❌ Development server not running. Start it with: npm run dev')
    process.exit(1)
  }
  
  await generateReport()
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { runLighthouse, generateReport }