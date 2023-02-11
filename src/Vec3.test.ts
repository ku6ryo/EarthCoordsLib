import { Vec3 } from "./Vec3"

function sameVector(a: Vec3, b: Vec3) {
  return a.dot(b) > 0.999999999
}

describe("cross", () => {
  it ("x cross y = z", () => {
    expect(sameVector(new Vec3(1, 0, 0).cross(new Vec3(0, 1, 0)), new Vec3(0, 0, 1))).toBe(true)
  })
})