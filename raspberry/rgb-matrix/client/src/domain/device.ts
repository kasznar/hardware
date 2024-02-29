export class Config {
    constructor(private width: number, private height: number) {}

    getLength(): number {
        return this.width * this.height
    }

    getHeight(): number {
        return this.height
    }

    getWidth(): number {
        return this.width
    }
}






