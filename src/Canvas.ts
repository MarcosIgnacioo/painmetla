import { Shape } from "./Shapes"

export class Canvas {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private currentShape: Shape
  private isDrawing: boolean
  private keyPressed: string



  public shapesHistory: Shape[];
  public poppedShapes: Shape[];
  public currentX: number
  public currentY: number
  public endX: number
  public endY: number
  public width: number
  public heigth: number


  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, currentShape: Shape) {
    if (!canvas)
      return;
    if (!context)
      return;
    this.canvas = canvas
    this.width = canvas.width
    this.heigth = canvas.height
    this.context = context;
    this.isDrawing = false;
    this.currentX = 0;
    this.currentY = 0;
    this.currentShape = currentShape;
    this.shapesHistory = []
    this.poppedShapes = []
  }

  public init(): void {


    this.canvas.addEventListener("mousedown", (e) => {
      this.isDrawing = true;
      this.currentShape.setOrigin(e.offsetX, e.offsetY);
    })

    this.canvas.addEventListener("mouseup", (e) => {
      this.isDrawing = false;
      this.currentShape.endShape(e.offsetX, e.offsetY);
      this.shapesHistory.push(this.currentShape.copyShape())
      console.log(this.currentShape.printShape())
    })

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.isDrawing)
        return;
      this.currentX = e.offsetX;
      this.currentY = e.offsetY;
      this.currentShape.endShape(e.offsetX, e.offsetY);
      this.clearCanvas();
      this.currentShape.drawShape(this)
    })

  }

  public undo(): void {
    this.poppedShapes.push(this.shapesHistory.pop())
    this.clearCanvas()
  }

  public redo(): void {
    this.shapesHistory.push(this.poppedShapes.pop())
    this.clearCanvas()
  }

  public setContext(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public setShape(shape: Shape) {
    this.currentShape = shape;
  }

  public getShape(): Shape {
    return this.currentShape
  }

  public getIsDrawing(): boolean {
    return this.isDrawing
  }

  public setIsDrawing(isDrawing: boolean): void {
    this.isDrawing = isDrawing
  }


  public getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  public setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
  }

  public setKey(keyPressed: string): void {
    this.keyPressed = keyPressed;
  }

  public getKey(): string {
    return this.keyPressed;
  }

  public clearCanvas(): void {
    if (!this.canvas || !this.context)
      return
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.width, this.heigth);
    if (!this.shapesHistory)
      return
    for (const shape of this.shapesHistory) {
      shape.drawShape(this)
    }
  }
  public exportCanvas(): string {
    let exported = ``;
    for (const shape of this.shapesHistory) {
      exported = exported.concat(shape.printShape())
    }
    console.log(exported)
    return exported
  }
}

