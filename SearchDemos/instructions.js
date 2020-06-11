    // provides instructions to the user on how to execute the algorithm
    function instructions() {
        // set the fond and weight of the text
        context.fillStyle = "white";
        context.font = "20px Arial";

        //set the content in the text and position on canvas
        context.fillText(
            "Searching Algorithm",
            VERTEX_W * VERTEX_COLS + 10,
            50
        );
        context.fillText("Visual Demo", VERTEX_W * VERTEX_COLS + 40, 100);

        if (numClicks == 0) {
            context.font = "16px Arial";
            context.fillText(
                "Click on a Block",
                VERTEX_W * VERTEX_COLS + 40,
                200
            );
        }
        if (numClicks == 1) {
            context.font = "16px Arial";
            context.fillText(
                "Click on another Block",
                VERTEX_W * VERTEX_COLS + 25,
                200
            );
        }
        if (numClicks > 1) {
            context.font = "12px Arial";
            context.fillText(
                "Drag a path with your mouse",
                VERTEX_W * VERTEX_COLS + 5,
                200
            );
            context.fillText(
                "to setup a road block between the",
                VERTEX_W * VERTEX_COLS + 5,
                220
            );
            context.fillText(
                "2 nodes (optional) and then PRESS:",
                VERTEX_W * VERTEX_COLS + 5,
                240
            );
            context.fillText(
                "'D' - for Dijkstra's (shortest path)",
                VERTEX_W * VERTEX_COLS + 10,
                260
            );
            context.fillText(
                "'A' - for A* (shortest path)",
                VERTEX_W * VERTEX_COLS + 10,
                275
            );
            context.fillText(
                "'G' - for Greedy Search",
                VERTEX_W * VERTEX_COLS + 10,
                290
            );
        }
        context.font = "11px Arial";
        drawRectangle(VERTEX_COLS * VERTEX_W + 25, 320, 150, 50, "green");
        context.fillStyle = "white";
        if (!toggleVisitedVerteces) {
            context.fillText(
                "  Click to SHOW any extra",
                VERTEX_COLS * VERTEX_W + 27,
                340
            );
            context.fillText(
                "   nodes that were Visited",
                VERTEX_COLS * VERTEX_W + 27,
                360
            );
            hideVisited();
        }
        if (toggleVisitedVerteces) {
            context.fillText(
                "Click to HIDE Visited Nodes",
                VERTEX_COLS * VERTEX_W + 32,
                340
            );
            toggleVisited();
        }
        if (instant) {
            drawRectangle(VERTEX_COLS * VERTEX_W + 25, 380, 150, 50, "purple");
            context.fillStyle = "white";
            context.fillText("Click for DYNAMIC find", VERTEX_COLS * VERTEX_W + 40,
                400
            );
            // context.fillText("Goes much slower but", VERTEX_COLS * VERTEX_W + 40,
            //   410);
            // context.fillText("shows search in real time", VERTEX_COLS * VERTEX_W + 36,
            //   425);
        }
        if (!instant) {
            drawRectangle(VERTEX_COLS * VERTEX_W + 25, 380, 150, 50, "red");
            context.fillStyle = "white";
            context.fillText("Click for INSTANT find", VERTEX_COLS * VERTEX_W + 40,
                400
            );
        }

        context.font = "13px Arial";
        context.fillStyle = "white";
        context.fillText("REFRESH page", VERTEX_W * VERTEX_COLS + 50, 450);
        drawRectangle(VERTEX_COLS * VERTEX_W + 25, 460, 150, 100, "white");
        context.fillStyle = "black";
        context.fillText("Or CLICK this BOX", VERTEX_COLS * VERTEX_W + 40, 480);
        context.fillText("to start over", VERTEX_COLS * VERTEX_W + 60, 500);
    }


    // helper function if needed to write messages on the screen
    function colorText(showWords, textX, textY, fillColor) {
        context.fillStyle = fillColor;
        context.fillText(showWords, textX, textY);
    }