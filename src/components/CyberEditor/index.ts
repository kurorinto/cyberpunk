interface Caret  {
  visible: boolean
  x: number
  y: number
  w: number
  h: number
}

export class CyberEditor {
  /** 画布最小宽度 */
  static MIN_WIDTH = 800
  /** 画布最小高度 */
  static MIN_HEIGHT = 400
  /** 行高 */
  static LINE_HEIGHT = 14

  /** 画布元素 */
  public canvas = document.createElement("canvas")
  /** 画布上下文 */
  public ctx = this.canvas.getContext("2d")
  /** 容器选择器 */
  public root: string

  /** 是否聚焦 */
  public focused = false
  /** 光标 */
  private caret: Caret = { visible: false, x: 12, y: 12, w: 1, h: CyberEditor.LINE_HEIGHT }

  constructor(root: string) {
    this.root = root
    this.init()
  }

  private init() {
    const rootDOM = document.querySelector(this.root)
    if (!rootDOM) {
      throw new Error("Root DOM not found")
    }

    const { width, height } = rootDOM.getBoundingClientRect()
    this.canvas.width = Math.max(width, CyberEditor.MIN_WIDTH)
    this.canvas.height = Math.max(height, CyberEditor.MIN_HEIGHT)
    this.canvas.style.boxShadow = "0 0 0 1px #ccc"
    rootDOM.appendChild(this.canvas)

    this.bindEvents()
  }

  private draw() {
    if (!this.ctx) {
      throw new Error("Canvas context not found")
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    // 绘制光标
    if (this.caret.visible) {
      this.ctx.fillStyle = "#000"
      this.ctx.fillRect(this.caret.x, this.caret.y, this.caret.w, this.caret.h)
    }
  }

  // 使用箭头函数，因为 this 会指向 CyberEditor 实例
  private keypressHandler = (e: KeyboardEvent) => {
    if (this.focused) {
      console.log(e.key)
    }
  }

  // 使用箭头函数，因为 this 会指向 CyberEditor 实例
  private clickHandler = (e: MouseEvent) => {
    this.focused = e.target === this.canvas
    if (this.ctx) {
      // 添加光标
      this.caret.visible = true
      this.draw()
    }
  }

  private bindEvents() {
    document.addEventListener("click", this.clickHandler)
    document.addEventListener("keypress", this.keypressHandler)
  }

  private removeEvents() {
    document.addEventListener("click", this.clickHandler)
    document.removeEventListener("keypress", this.keypressHandler)
  }

  public destroy() {
    this.removeEvents()
    this.canvas.remove()
  }
}