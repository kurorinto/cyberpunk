export class CyberEditor {
  static MIN_WIDTH = 800
  static MIN_HEIGHT = 400
  public canvas = document.createElement("canvas")
  public root: string

  constructor(root: string) {
    this.root = root
    this.init()
  }

  public init() {
    const rootDOM = document.querySelector(this.root)
    if (!rootDOM) {
      throw new Error("Root DOM not found")
    }

    const { width, height } = rootDOM.getBoundingClientRect()
    this.canvas.width = Math.max(width, CyberEditor.MIN_WIDTH)
    this.canvas.height = Math.max(height, CyberEditor.MIN_HEIGHT)
    rootDOM.appendChild(this.canvas)
  }

  public destroy() {
    this.canvas.remove()
  }
}