import Matrix from "ml-matrix"

export function createRotXMat(angle: number) {
  return new Matrix([
    [1, 0, 0, 0],
    [0, Math.cos(angle), - Math.sin(angle), 0],
    [0, Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 0, 1],
  ])
}

export function createRotYMat(angle: number) {
  return new Matrix([
    [Math.cos(angle), 0, Math.sin(angle), 0],
    [0, 1, 0, 0],
    [-Math.sin(angle), 0, Math.cos(angle), 0],
    [0, 0, 0, 1],
  ])
}

export function createRotZMat(angle: number) {
  return new Matrix([
    [Math.cos(angle), - Math.sin(angle), 0, 0],
    [Math.sin(angle), Math.cos(angle), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ])
}