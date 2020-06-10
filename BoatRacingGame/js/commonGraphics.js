function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    context.save();
    context.translate(atX, atY);
    context.rotate(withAng);
    context.drawImage(
        useBitmap, -useBitmap.width / 2, -useBitmap.height / 2
    );
    context.restore();
}

function drawRectangle(topX, topY, bottomX, bottomY, color) {
    context.fillStyle = color;
    context.fillRect(topX, topY, bottomX, bottomY);
}

function drawCircle(boatX, boatY, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(boatX, boatY, radius, 0, Math.PI * 2, true);
    context.fill();
}

function colorText(showWords, textX, textY, fillColor) {
    context.fillStyle = fillColor;
    context.fillText(showWords, textX, textY);
}