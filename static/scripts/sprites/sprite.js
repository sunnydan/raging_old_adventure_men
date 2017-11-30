function Sprite(img, sx, sy, swidth, sheight) {
    this.ready = false;
    this.imageObj = img;
    this.x = sx;
    this.y = sy;
    this.width = swidth;
    this.height = sheight;

    this.drawImage = (context, cx, cy) => {
        context.drawImage(this.imageObj, this.x, this.y, this.width, this.height, cx, cy, this.width, this.height);
    }

}