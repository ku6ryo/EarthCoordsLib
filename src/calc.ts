import Matrix from "ml-matrix"
import { Coordinates } from "./Coordinates"
import { Vec3 } from "./Vec3"
import { EPSILON } from "./constants"
import { createRotXMat, createRotZMat } from "./affine"

/**
 * Calculates the vector from the center of the Earth to the given coords.
 * It assumes that the radius of the Earth is 1.
 * x axis (0, 0)
 * y axis (0, 90)
 * z axis (90, any)
 */
export function coordinatesToVec(c: Coordinates) {
  const latRad = c.lat * Math.PI / 180 
  const longRad = c.long * Math.PI / 180
  const latPlaneRadius = Math.cos(latRad)
  return new Vec3(
    latPlaneRadius * Math.cos(longRad),
    latPlaneRadius * Math.sin(longRad),
    Math.sin(latRad)
  )
}

/**
 * Calculates the distnace between two points on the Earth.
 * It is the minimum distance when we trip on the surface of the Earth.
 */
export function calcDistanceBetweenCoords(c0: Coordinates, c1: Coordinates) {
  const v0 = coordinatesToVec(c0)
  const v1 = coordinatesToVec(c1)
  const rad = v0.dot(v1)
  return Math.acos(rad)
}

/**
 * Calculates the vector at the end point when we trip from the start point to the end point in minimum distance.
 */
export function calcVecFromStartToEnd(s: Coordinates, e: Coordinates) {
  const sv = coordinatesToVec(s)
  const ev = coordinatesToVec(e)
  const c = sv.cross(ev)
  // If the two places are so close or they are on the completely opposite place of the Earth,
  // caluculates direction from the north pole.
  return c.squaredLength() < EPSILON ? new Vec3(0, 0, 1).cross(ev).cross(ev).normalize() : c.cross(ev).normalize()
}

/**
 * Calculates the vector at the end point when we trip from the start point to the end point in minimum distance.
 * The vector is of the coordinate system on the surface of the Earth.
 * East is x axis, North is y axis, and z axis is oppsite of gravity.
 */
export function clacVecFromStartToEndOnSurface(s: Coordinates, e: Coordinates) {
  const v3d = calcVecFromStartToEnd(s, e)
  const mRotZ = createRotZMat((e.lat - 90) * Math.PI / 180)
  const mRotX = createRotXMat(- Math.PI / 2)
  const mV = new Matrix([[v3d.x], [v3d.y], [v3d.z], [1]])
  const result = mRotX.mmul(mRotZ.mmul(mV))
  return new Vec3(result.get(0, 0), result.get(1, 0), result.get(2, 0))
}