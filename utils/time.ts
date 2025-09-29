// time.ts - 时间控制工具
import dayjs from 'dayjs'

// 存储覆盖的日期，用于模拟时间
let overrideDate: dayjs.Dayjs | null = null

// 设置覆盖日期（模拟时间）
export const setTime = (date: string | Date | dayjs.Dayjs) => {
  overrideDate = dayjs(date)
  // 同时存储到 localStorage，以便在页面刷新后保持
  if (typeof window !== 'undefined') {
    localStorage.setItem('overrideDate', overrideDate.toISOString())
  }
}

// 清除覆盖日期（恢复正常时间）
export const resetTime = () => {
  overrideDate = null
  // 同时清除 localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('overrideDate')
  }
}

// 获取当前时间（如果设置了覆盖日期，则返回覆盖日期，否则返回实际当前日期）
export const now = () => {
  if (overrideDate) {
    return overrideDate
  }
  
  // 检查 localStorage 中是否有存储的覆盖日期
  if (typeof window !== 'undefined') {
    const storedDate = localStorage.getItem('overrideDate')
    if (storedDate) {
      overrideDate = dayjs(storedDate)
      return overrideDate
    }
  }
  
  return dayjs() // 返回当前实际时间
}

// 检查当前是否处于时间覆盖模式
export const isTimeOverridden = () => {
  return overrideDate !== null
}

// 获取覆盖日期的字符串表示
export const getOverrideDate = () => {
  return overrideDate ? overrideDate.toISOString() : null
}