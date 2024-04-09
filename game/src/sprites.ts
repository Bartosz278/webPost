class Spirtie {
  position: number;
  height: number;
  width: number;
  imgSrc: string;
  scale: number;
  image: HTMLImageElement;
  constructor({ position, imgSrc, scale }) {
    this.position = position;
    this.imgSrc = imgSrc;
    this.scale = scale;
  }
}
