import { Coordinates } from "./Coordinates"
import { Vec3 } from "./Vec3"
import { calcDistanceBetweenCoords, calcVecFromStartToEnd, clacVecFromStartToEndOnSurface, coordinatesToVec } from "./calc"
import { EPSILON } from "./constants"

function almostEqualNumber(a: number, b: number) {
  return Math.abs(a - b) < EPSILON
}

describe("coordinatesToVec", () => {
  it("The north pole", () => {
    const v = coordinatesToVec(new Coordinates(90, 0))
    expect(v.almostEqual(new Vec3(0, 0, 1))).toBe(true)
  })
  it("90,45", () => {
    const v = coordinatesToVec(new Coordinates(90, 45))
    expect(v.almostEqual(new Vec3(0, 1 / Math.sqrt(2), 1 / Math.sqrt(2)).normalize()))
  })
})

describe("Round distance tests", () => {
  it("Distance between the north pole and the south poll.", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(90, 0), new Coordinates(-90, 0))
    expect(d).toBe(Math.PI)
  })
  it("90 degree on Equator", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(0, 0), new Coordinates(0, 90))
    expect(d).toBe(Math.PI / 2)
  })
  it("90 degree on Equator. Lat: -135 <--> 135", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(0, -135), new Coordinates(0, 135))
    expect(almostEqualNumber(d, Math.PI / 2)).toBe(true)
  })
  it("Harf round. 45,45 <--> -45,-45", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(45, 90), new Coordinates(-45, -90))
    expect(almostEqualNumber(d, Math.PI)).toBe(true)
  })
})

describe("Start --> End vector 3D", () => {
  it("Vector 0,-30 --> 0,0", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, -30), new Coordinates(0, 0))
    expect(v.almostEqual(new Vec3(0, 1, 0).normalize())).toBe(true)
  })
  it("Vector 0,30 --> 0,0", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, 30), new Coordinates(0, 0))
    expect(v.almostEqual(new Vec3(0, -1, 0).normalize())).toBe(true)
  })
  it("Vector -45,-90 --> 0,0", () => {
    const v = calcVecFromStartToEnd(new Coordinates(-45, -90), new Coordinates(0, 0))
    expect(v.almostEqual(new Vec3(0, 1, 1).normalize())).toBe(true)
  })
  it("Vector from / to the same place", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, 0), new Coordinates(0, 0))
    expect(v.almostEqual(new Vec3(0, 0, -1).normalize())).toBe(true)
  })
  it("Vector from opposite side", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, 0), new Coordinates(0, 180))
    expect(v.almostEqual(new Vec3(0, 0, -1).normalize())).toBe(true)
  })
})

describe("Start --> End vector in surface coordinate system", () => {
  it("Vector 0,-30 --> 0,0", () => {
    const v = clacVecFromStartToEndOnSurface(new Coordinates(0, -30), new Coordinates(0, 0))
    expect(v.almostEqual(new Vec3(1, 0, 0).normalize())).toBe(true)
  })
  it("Vector -45,-90 --> 0,0", () => {
    const v = clacVecFromStartToEndOnSurface(new Coordinates(-45, -90), new Coordinates(0, 0))
    expect(v.almostEqual(new Vec3(1, 1, 0).normalize())).toBe(true)
  })
  it("Vector from opposite side", () => {
    const v = clacVecFromStartToEndOnSurface(new Coordinates(0, 0), new Coordinates(0, 180))
    expect(v.almostEqual(new Vec3(0, -1, 0).normalize())).toBe(true)
  })
})