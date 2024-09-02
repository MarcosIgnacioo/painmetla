import { Canvas } from "./Canvas";

export interface Shape {
  drawShape(canvas: Canvas): void
  setOrigin(x: number, y: number): void
  setColor(color: string): void
  endShape(x: number, y: number): void
  copyShape(): Shape
  setColors(fillColor: string, strokeColor: string): void
  printShape(): string
}

//////
//////

export class Rectangle implements Shape {

  public pivotX: number = 0;
  public pivotY: number = 0;
  public x: number = 0;
  public y: number = 0;
  public height: number = 0;
  public width: number = 0;
  public color: string = "";

  constructor(x: number, y: number, width: number, height: number, color: string) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.color = color
  }

  drawShape(canvas: Canvas): void {
    const ctx = canvas.getContext();
    if (!ctx)
      return;
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  setOrigin(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.pivotX = x;
    this.pivotY = y;
  }

  endShape(movingX: number, movingY: number): void {
    this.width = Math.abs(this.pivotX - movingX);
    this.height = Math.abs(this.pivotY - movingY);

    this.x = (this.pivotX > movingX) ? movingX : this.x
    this.y = (this.pivotY > movingY) ? movingY : this.y
  }

  copyShape(): Shape {
    return new Rectangle(this.x, this.y, this.width, this.height, this.color)
  }

  printShape(): string {
    return `
    ctx.fillStyle = '${this.color}'
    ctx.fillRect(${this.x}, ${this.y}, ${this.width}, ${this.height})
`

  }

  setColor(color: string) {
    this.color = color;
  }

  setColors(fillColor: string, strokeColor: string) {
  }
}

export class Matrix implements Shape {

  public pivotX: number = 0;
  public pivotY: number = 0;
  public x: number = 0;
  public y: number = 0;
  public height: number = 0;
  public width: number = 0;
  public color: string = "";
  public contrastColor: string = ""

  constructor(x: number, y: number, width: number, height: number, color: string) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.color = color
  }

  drawShape(canvas: Canvas): void {
    const ctx = canvas.getContext();
    if (!ctx)
      return;
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    this.contrastColor = this.reverseRgb(this.color)
    ctx.fillStyle = this.contrastColor
    console.log(this.contrastColor)
    const squareWidth = 30;
    for (let i = 0; i < this.width / squareWidth - 1; i++) {
      for (let j = 0; j < this.height / squareWidth - 1; j++) {
        const xd = ((j % 2 == 0)) ? 1 : 0;
        if ((i + xd) % 2 == 0) {
          ctx.fillRect(this.x + (squareWidth * i), this.y + (squareWidth * j), squareWidth, squareWidth)
        }
      }
    }
  }

  parseRgb(input: string) {
    const m = input.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+),\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
      return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), parseInt(m[4])];
    }
  }

  reverseRgb(colorRgb: string): string {
    let rgbParsed = this.parseRgb(colorRgb);
    for (let i = 0; i < rgbParsed.length; i++) {
      rgbParsed[i] += 50;
    }
    return "rgba(" + rgbParsed.join(",") + ")"
  }


  setOrigin(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.pivotX = x;
    this.pivotY = y;
  }

  endShape(movingX: number, movingY: number): void {
    this.width = Math.abs(this.pivotX - movingX);
    this.height = Math.abs(this.pivotY - movingY);

    this.x = (this.pivotX > movingX) ? movingX : this.x
    this.y = (this.pivotY > movingY) ? movingY : this.y
  }

  copyShape(): Shape {
    return new Matrix(this.x, this.y, this.width, this.height, this.color)
  }

  printShape(): string {
    return `
    ctx.fillStyle = '${this.color}'
    ctx.fillRect(${this.x}, ${this.y}, ${this.width}, ${this.height})

    ctx.fillStyle = '${this.contrastColor}'
    const squareWidth= 30;
    for (let i = 0; i < ${this.width} / squareWidth - 1; i++) {
      for (let j = 0; j < ${this.height} / squareWidth - 1; j++) {
        const xd = ((j % 2 == 0)) ? 1 : 0
        if ((i + xd) % 2 == 0) {
          ctx.fillRect(${this.x} + (squareWidth * i), ${this.y} + (squareWidth * j), squareWidth, squareWidth)
        }
      }
    }
`}

  setColor(color: string) {
    this.color = color;
  }

  setColors(fillColor: string, strokeColor: string) {
  }

}

// o
export class Circle implements Shape {

  public x: number = 0;
  public y: number = 0;
  public radius: number = 0;
  public fillColor: string = "";
  public strokeColor: string = "";

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x
    this.y = y
    this.radius = radius
    this.fillColor = color
  }

  drawShape(canvas: Canvas): void {
    const ctx = canvas.getContext();
    if (!ctx)
      return;
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.fillColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }


  setOrigin(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
  endShape(x: number, y: number): void {
    const subX = this.x - x;
    const subY = this.y - y;
    this.radius = Math.sqrt(subX * subX + subY * subY);
  }

  copyShape(): Shape {
    return new Circle(this.x, this.y, this.radius, this.fillColor)
  }

  printShape(): string {
    return `
    ctx.fillStyle = '${this.fillColor}'
    ctx.strokeStyle = '${this.strokeColor}'
    ctx.beginPath()
    ctx.arc(${this.x}, ${this.y}, ${this.radius}, 0 * Math.PI, 2 * Math.PI);
    ctx.fill()
    ctx.closePath()
`
  }

  setColor(color: string) {
    this.fillColor = color;
  }

  setColors(fillColor: string, strokeColor: string) {
    this.strokeColor = strokeColor
    this.fillColor = fillColor;
  }

}

// \
export class Line implements Shape {

  public originX: number = 0;
  public originY: number = 0;
  public endX: number = 0;
  public endY: number = 0;
  public color: string = "";

  constructor(originX: number, originY: number, endX: number, endY: number, color: string) {
    this.originX = originX
    this.originY = originY
    this.endX = endX
    this.endY = endY
    this.color = color
  }

  drawShape(canvas: Canvas): void {
    const ctx = canvas.getContext();
    if (!ctx)
      return;
    if (!canvas.getIsDrawing())
      return;
    ctx.lineWidth = 5;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.originX, this.originY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
    ctx.closePath();
  }

  setOrigin(x: number, y: number): void {
    this.originX = x;
    this.originY = y;
  }

  endShape(x: number, y: number): void {
    this.endX = x;
    this.endY = y;
  }

  copyShape(): Shape {
    return new Line(this.originX, this.originY, this.endX, this.endY, this.color)
  }

  printShape(): string {
    return `
    ctx.strokeStyle = '${this.color}'
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(${this.originX}, ${this.originY})
    ctx.lineTo(${this.endX}, ${this.endY})
    ctx.stroke()
    ctx.closePath()
`
  }

  setColors(fillColor: string, strokeColor: string) {
    this.color = fillColor
  }

  setColor(color: string) {
    this.color = color;
  }
}

