import { Coordinates } from "./Coordinates"
import { Vec3 } from "./Vec3"
import { calcDistanceBetweenCoords, calcVecFromStartToEnd, coordinatesToVec } from "./calc"
import { EARTH_RADIUS_ROUGH } from "./constants"

function sameVector(a: Vec3, b: Vec3) {
  return a.dot(b) > 0.999999999
}

describe("coordinatesToVec", () => {
  it("The north pole", () => {
    const v = coordinatesToVec(new Coordinates(90, 0))
    expect(sameVector(v, new Vec3(0, 0, 1))).toBe(true)
  })
  it("90,45", () => {
    const v = coordinatesToVec(new Coordinates(90, 45))
    expect(sameVector(v, (new Vec3(0, 1 / Math.sqrt(2), 1 / Math.sqrt(2)).normalize())))
  })
})

describe("Round distance tests", () => {
  it("Distance between the north pole and the south poll.", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(90, 0), new Coordinates(-90, 0))
    expect(d).toBe(Math.PI * EARTH_RADIUS_ROUGH)
  })
  it("90 degree on Equator", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(0, 0), new Coordinates(0, 90))
    expect(d).toBe(Math.PI * EARTH_RADIUS_ROUGH / 2)
  })
  it("90 degree on Equator. Lat: -135 <--> 135", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(0, -135), new Coordinates(0, 135))
    expect(d.toFixed(5)).toBe((Math.PI * EARTH_RADIUS_ROUGH / 2).toFixed(5))
  })
  it("Harf round. 45,45 <--> -45,-45", () => {
    const d = calcDistanceBetweenCoords(new Coordinates(45, 90), new Coordinates(-45, -90))
    expect(d.toFixed(5)).toBe((Math.PI * EARTH_RADIUS_ROUGH).toFixed(5))
  })
})

describe("Start --> End vector", () => {
  it("Vector 0,-30 --> 0,0", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, -30), new Coordinates(0, 0))
    expect(sameVector(v, new Vec3(0, 1, 0).normalize())).toBe(true)
  })
  it("Vector 0,30 --> 0,0", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, 30), new Coordinates(0, 0))
    expect(sameVector(v, new Vec3(0, -1, 0).normalize())).toBe(true)
  })
  it("Vector -45,-90 --> 0,0", () => {
    const v = calcVecFromStartToEnd(new Coordinates(-45, -90), new Coordinates(0, 0))
    expect(sameVector(v, new Vec3(0, 1, 1).normalize())).toBe(true)
  })
  it("Vector from / to the same place", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, 0), new Coordinates(0, 0))
    expect(sameVector(v, new Vec3(0, 0, -1).normalize())).toBe(true)
  })
  it("Vector from opposite side", () => {
    const v = calcVecFromStartToEnd(new Coordinates(0, 0), new Coordinates(0, 180))
    expect(sameVector(v, new Vec3(0, 0, -1).normalize())).toBe(true)
  })
})