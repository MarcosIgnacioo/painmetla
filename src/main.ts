import Picker from 'vanilla-picker';
import { Canvas } from './Canvas.ts';
import './index.css'
import { Circle, Line, Matrix, Rectangle, Shape } from './Shapes.ts';
console.log("ewp");

const canvas = document.getElementById('canvas-ms') as HTMLCanvasElement
const debug = document.getElementById('debug');
let currentColor: string = ""

const parentFixed = document.getElementById("fixed")


const shapeRadioButtons = document.querySelectorAll<HTMLInputElement>('input[name="shape"]');
let selectedShape: string = 'line';

let currentShape: Shape = new Line(0, 0, 20, 20, "pink");

const ctx = canvas.getContext("2d")


const drawingCanvas: Canvas = new Canvas(canvas, canvas.getContext("2d"), currentShape)

shapeRadioButtons.forEach((radio) => {
  // caveman af but idgaf
  if (radio.checked) {
    selectedShape = radio.value;
    switch (selectedShape) {
      case 'circle':
        drawingCanvas.setShape(new Circle(50, 50, 20, currentColor))
        break;
      case 'line':
        drawingCanvas.setShape(new Line(0, 0, 20, 20, currentColor))
        break;
      case 'rectangle':
        drawingCanvas.setShape(new Rectangle(150, 150, 50, 20, currentColor))
        break;
      case 'matrix':
        drawingCanvas.setShape(new Matrix(150, 150, 50, 20, currentColor))
        break;
    }
  }
  radio.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement;
    selectedShape = target.value
    switch (selectedShape) {
      case 'circle':
        drawingCanvas.setShape(new Circle(50, 50, 20, currentColor))
        break;
      case 'line':
        drawingCanvas.setShape(new Line(0, 0, 20, 20, currentColor))
        break;
      case 'rectangle':
        drawingCanvas.setShape(new Rectangle(150, 150, 50, 20, currentColor))
        break;
      case 'matrix':
        drawingCanvas.setShape(new Matrix(150, 150, 50, 20, currentColor))
        break;
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Shift" && e.key !== "Control" && e.key !== "u" && e.key !== "r" && e.key !== "e" && e.key !== "b")
    return;
  if (e.key == "u") {
    drawingCanvas.undo()
  }
  if (e.key == "r") {
    drawingCanvas.redo()
  }
  if (e.key == "e") {
    drawingCanvas.exportCanvas()
  }
  // if (e.key == "b") {
  //   drawingCanvas.getShape().setColors("rgba(0, 0, 255, 0)", "pink")
  // }
  drawingCanvas.setKey(e.key)
})

document.addEventListener("keyup", (e) => {
  drawingCanvas.setKey("")
  // if (e.key == "b") {
  //   drawingCanvas.getShape().setColors("red", "rgba(0, 0, 255, 0)")
  // }
})

drawingCanvas.init();

new Picker({
  parent: parentFixed,
  popup: false,
  alpha: true,
  editor: true,
  color: "orangered",
  onChange: function(color: any) {
    currentColor = color.rgbaString;
    drawingCanvas.getShape().setColor(currentColor)
  },
});

// hacer una clase para el canvas la cual tenga el propio canvas, el contexto, el update y pues todas esas jaladas, la manera de pipearlo seria alterando el estado de currentlyDrawingShapeen por ejemplo si se hace un keypress de shift, se hace que la y sea siempre fija o proporcional en elcaso de que se aumente la y mientras shift es presionado, esto cambia dependiendo de la figura que se este, cada figura puede tener algo que sea como el shift mode o algo asi, cada clase tendra un tostring que sea el draw ctx yy todo eso, la clase canvas tambien tendria la figura seleccionada por el usuario como una constante en un enum, espero poder hacer esto ma;ana y hacer igual el decoder de una imagen en c bueno no decoder pero lector? tambien una extension de shape que sea matrix para dibujar un grid en base a una matriz dada
//

// const currentlyDrawingShape: Shape | null = null
//
//
// const wep2: Rectangle = new Rectangle(150, 150, 50, 20, "blue");
// const wep3: Line = new Line(0, 0, 20, 20, "pink");
//
// canvas.addEventListener("mousemove", (e) => {
//   if (!debug)
//     return;
//   debug.innerText = e.offsetX + " " + e.offsetY;
// })
