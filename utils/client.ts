// 检查是否在客户端环境
export const isClient = () => {
  return typeof window !== 'undefined'
}

// 安全的 localStorage 操作
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isClient()) return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  
  setItem: (key: string, value: string): void => {
    if (!isClient()) return
    try {
      localStorage.setItem(key, value)
    } catch {
      // 忽略错误
    }
  },
  
  removeItem: (key: string): void => {
    if (!isClient()) return
    try {
      localStorage.removeItem(key)
    } catch {
      // 忽略错误
    }
  }
}

// 安全的剪贴板操作
export const safeClipboard = {
  writeText: async (text: string): Promise<boolean> => {
    if (!isClient() || !navigator.clipboard) return false
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }
}
