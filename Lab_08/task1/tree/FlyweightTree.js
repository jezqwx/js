export class FlyweightTree {
  constructor(type, species, foliageColor, trunkColor, height, width) {
    this.type = type;
    this.species = species;
    this.foliageColor = foliageColor;
    this.trunkColor = trunkColor;
    this.height = height;
    this.width = width;
  }

  render(ctx, x, y, scale, rotation) {
    ctx.save();

    ctx.trunslate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    ctx.fillStyle = this.foliageColor;
    ctx.beginPath();
    ctx.moveTo(0, -this.height);
    ctx.lineTo(-this.width, this.height / 3);
    ctx.lineTo(this.width, this.height / 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
  getInfo(){
    return `${this.species} (${this.type})`
  }}