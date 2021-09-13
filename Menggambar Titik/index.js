function main() {
  /**
   * @type {HTMLCanvasElement} canvas
   */
  // Buat kanvas
  const canvas = document.getElementById('canvas')

  /**
   * @type {WebGLRenderingContext} gl
   */
  // Buat alat
  const context = canvas.getContext('webgl')

  // Definisikan titik
  const vertexShaderCode = `
  void main() {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 10.0;
  }
  `

  let vertexShader = context.createShader(context.VERTEX_SHADER)
  context.shaderSource(vertexShader, vertexShaderCode)
  context.compileShader(vertexShader)

  // Mendefinisikan warna
  let fragmentShaderCode = `
  void main() {
      gl_FragColor = vec4(0.0, 0.878, 0.953, 1.0);
  }
  `

  let fragmentShader = context.createShader(context.FRAGMENT_SHADER)
  context.shaderSource(fragmentShader, fragmentShaderCode)
  context.compileShader(fragmentShader)

  // Link program
  let shaderProgram = context.createProgram()
  context.attachShader(shaderProgram, vertexShader)
  context.attachShader(shaderProgram, fragmentShader)
  context.linkProgram(shaderProgram)
  context.useProgram(shaderProgram)

  context.clearColor(0.086, 0.086, 0.086, 1)
  context.clear(context.COLOR_BUFFER_BIT)

  context.drawArrays(context.POINTS, 0.0, 1)
}
