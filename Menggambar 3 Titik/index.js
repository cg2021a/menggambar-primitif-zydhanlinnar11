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
  const vertices = [
    -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
  ]

  const positionBuffer = context.createBuffer()
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer)
  context.bufferData(
    context.ARRAY_BUFFER,
    new Float32Array(vertices),
    context.STATIC_DRAW
  )
  context.bindBuffer(context.ARRAY_BUFFER, null)

  const vertexShaderCode = document.getElementById('vertexShaderCode').innerText
  const vertexShader = context.createShader(context.VERTEX_SHADER)
  context.shaderSource(vertexShader, vertexShaderCode)
  context.compileShader(vertexShader)

  const fragmentShaderCode =
    document.getElementById('fragmentShaderCode').innerText
  const fragmentShader = context.createShader(context.FRAGMENT_SHADER)
  context.shaderSource(fragmentShader, fragmentShaderCode)
  context.compileShader(fragmentShader)

  const shaderProgram = context.createProgram()
  context.attachShader(shaderProgram, vertexShader)
  context.attachShader(shaderProgram, fragmentShader)
  context.linkProgram(shaderProgram)
  context.useProgram(shaderProgram)

  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer)
  const aPos = context.getAttribLocation(shaderProgram, 'a_Position')

  context.vertexAttribPointer(aPos, 2, context.FLOAT, false, 0, 0)
  context.enableVertexAttribArray(aPos)

  context.clearColor(0.086, 0.086, 0.086, 1)
  context.clear(context.COLOR_BUFFER_BIT)

  context.drawArrays(context.TRIANGLES, 0.0, 6)
}
