// boat drawing code
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    context.save();
    context.translate(atX, atY);
    context.rotate(withAng);
    context.drawImage(
        useBitmap, -useBitmap.width / 2, -useBitmap.height / 2
    );
    context.restore();
}

// helper function to draw grid
function drawRectangle(topX, topY, bottomX, bottomY, color) {
    context.fillStyle = color;
    context.fillRect(topX, topY, bottomX, bottomY);
}

// helper function to  write text to screen
function colorText(showWords, textX, textY, fillColor) {
    context.fillStyle = fillColor;
    context.fillText(showWords, textX, textY);
}