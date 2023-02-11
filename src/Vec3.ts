
export class Vec3 {

  constructor(public x: number, public y: number, public z: number) {}

  squaredLength() {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  length() {
    return Math.sqrt(this.squaredLength())
  }

  normalize() {
    const len = this.length()
    return new Vec3(
      this.x / len,
      this.y / len,
      this.z / len
    )
  }

  dot(v: Vec3) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  cross(v: Vec3) {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    )
  }

  inverse() {
    return new Vec3(-this.x, -this.y, -this.z)
  }

  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`
  }
}