interface Caret {
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
  /** 字体大小 */
  static FONT_SIZE = 14
  /** 行高 */
  static LINE_HEIGHT = 14

  /** 画布元素 */
  public canvas = document.createElement("canvas")
  /** 画布上下文 */
  public ctx = this.canvas.getContext("2d")
  /** 容器选择器 */
  public root: string

  /** 输入法div */
  private textBox: HTMLDivElement = document.createElement("div")

  /** 是否聚焦 */
  public _focused = false
  /** 是否正在输入法输入 */
  public isComposing = false
  /** 光标 */
  private caret: Caret = { visible: false, x: 12, y: 12, w: 1, h: CyberEditor.LINE_HEIGHT }
  private blinkTimer: NodeJS.Timeout | undefined

  /** 文本内容 */
  private text = ""

  /** 是否聚焦 */
  set focused(focused: boolean) {
    this._focused = focused
    if (this._focused) {
      // 闪烁光标
      this.blinkCaret()
      this.textBox.focus()
    } else {
      // 去掉光标
      this.clearCaret()
      this.textBox.blur()
      this.textBox.innerHTML = ""
    }
  }
  get focused() {
    return this._focused
  }

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

    this.textBox.style.position = "absolute"
    this.textBox.style.top = "0"
    this.textBox.style.left = "0"
    this.textBox.style.pointerEvents = "none"
    this.textBox.style.opacity = "0"
    this.textBox.style.userSelect = "none"
    this.textBox.style.outline = "none"
    this.textBox.style.zIndex = "-1"
    this.textBox.style.fontSize = `${CyberEditor.FONT_SIZE}px`
    this.textBox.style.lineHeight = `${CyberEditor.LINE_HEIGHT}px`
    this.textBox.contentEditable = "true"
    this.textBox.onblur = () => {
      this.textBox.innerHTML = ""
      this.focused = false
    }
    rootDOM.appendChild(this.textBox)

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
    // 绘制文字
    this.ctx.fillStyle = "#000"
    this.ctx.font = `${CyberEditor.FONT_SIZE}px system-ui`
    this.ctx.fillText(this.text, 12, 12 + CyberEditor.LINE_HEIGHT)
  }

  /** 光标闪烁 */
  private blinkCaret(visible?: boolean) {
    if (visible === undefined) {
      this.caret.visible = true
    }
    this.draw()
    clearTimeout(this.blinkTimer)
    this.blinkTimer = setTimeout(() => {
      this.caret.visible = !this.caret.visible
      this.blinkCaret(this.caret.visible)
    }, 500)
  }

  private clearCaret() {
    this.caret.visible = false
    this.draw()
    clearTimeout(this.blinkTimer)
  }

  // 使用箭头函数，因为 this 会指向 CyberEditor 实例
  private keydownHandler = (e: KeyboardEvent) => {
    if (this.focused) {
      const { key, altKey, metaKey, ctrlKey, shiftKey, code } = e
      if (key.length === 1) {
        if (this.isComposing) {
        } else {
          this.insertText(key)
        }
      }
      switch (key) {
        case 'Backspace':
          this.deleteText()
          break
        default:
          break
      }
      console.log({ key, altKey, metaKey, ctrlKey, shiftKey, code })
    }
  }

  // 使用箭头函数，因为 this 会指向 CyberEditor 实例
  private clickHandler = (e: MouseEvent) => {
    this.focused = e.target === this.canvas
  }

  private compositionstartHandler = (e: CompositionEvent) => {
    this.isComposing = true
  }

  private compositionendHandler = (e: CompositionEvent) => {
    this.insertText(this.textBox.innerHTML)
    this.textBox.innerHTML = ""
    this.isComposing = false
  }

  private bindEvents() {
    document.addEventListener("click", this.clickHandler)
    document.addEventListener("keydown", this.keydownHandler)
    document.addEventListener("compositionstart", this.compositionstartHandler)
    document.addEventListener("compositionend", this.compositionendHandler)
  }

  private removeEvents() {
    document.removeEventListener("click", this.clickHandler)
    document.removeEventListener("keydown", this.keydownHandler)
    document.removeEventListener("compositionstart", this.compositionstartHandler)
    document.removeEventListener("compositionend", this.compositionendHandler)
  }

  public destroy() {
    this.removeEvents()
    this.canvas.remove()
    this.textBox.remove()
    this.clearCaret()
  }

  public insertText(text: string) {
    if (!this.ctx) {
      throw new Error("Canvas context not found")
    }

    this.text += text
    this.caret.x += text.length * this.ctx.measureText(text).width
    this.blinkCaret()
    this.draw()
  }

  public deleteText() {
    if (!this.ctx) {
      throw new Error("Canvas context not found")
    }
    const text = this.text.slice(-1)
    this.text = this.text.slice(0, this.text.length - 1)
    this.caret.x -= text.length * this.ctx.measureText(text).width
    this.blinkCaret()
    this.draw()
  }
}