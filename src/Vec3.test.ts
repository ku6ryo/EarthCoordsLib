import { Vec3 } from "./Vec3"

describe("cross", () => {
  it ("x cross y = z", () => {
    expect(new Vec3(1, 0, 0).cross(new Vec3(0, 1, 0)).almostEqual(new Vec3(0, 0, 1))).toBe(true)
  })
})