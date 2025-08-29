#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 读取节日数据
const festivalsPath = path.join(__dirname, '../data/festivals.json')
const festivalsData = JSON.parse(fs.readFileSync(festivalsPath, 'utf8'))

// 预期的筹备天数配置
const expectedPreparationDays = {
  '元旦': 15,
  '春节': 30,
  '情人节': 20,
  '三八妇女节': 15,
  '315消费者权益日': 10,
  '清明节': 10,
  '五一劳动节': 20,
  '母亲节': 15,
  '六一儿童节': 15,
  '端午节': 15,
  '618购物节': 45,
  '建党节': 10,
  '七夕节': 20,
  '建军节': 10,
  '教师节': 15,
  '中秋节': 25,
  '国庆节': 30,
  '重阳节': 15,
  '双11购物节': 45,
  '感恩节': 15,
  '双12购物节': 30,
  '冬至': 10,
  '圣诞节': 20,
  '全国两会': 20,
  '阅兵仪式': 30,
  '世界杯预选赛': 15,
  '奥运会': 30,
  '高考': 30,
  '考研': 60,
  '春节联欢晚会': 30
}

console.log('🔍 开始验证节日数据中的 preparationDays...\n')

let allCorrect = true
let errors = []

festivalsData.festivals.forEach(festival => {
  const expected = expectedPreparationDays[festival.name]
  const actual = festival.preparationDays
  
  if (expected === undefined) {
    console.log(`⚠️  ${festival.name}: 未找到预期配置 (当前: ${actual}天)`)
    errors.push(`${festival.name}: 缺少预期配置`)
  } else if (expected !== actual) {
    console.log(`❌  ${festival.name}: 预期 ${expected}天, 实际 ${actual}天`)
    errors.push(`${festival.name}: 预期 ${expected}天, 实际 ${actual}天`)
    allCorrect = false
  } else {
    console.log(`✅  ${festival.name}: ${actual}天 (正确)`)
  }
})

console.log('\n📊 验证结果:')
console.log(`总节日数: ${festivalsData.festivals.length}`)
console.log(`正确数量: ${festivalsData.festivals.length - errors.length}`)
console.log(`错误数量: ${errors.length}`)

if (errors.length > 0) {
  console.log('\n❌ 发现以下错误:')
  errors.forEach(error => console.log(`  - ${error}`))
  process.exit(1)
} else {
  console.log('\n🎉 所有节日的 preparationDays 都正确!')
  process.exit(0)
}
