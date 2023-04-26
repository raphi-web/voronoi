// import the compiled wasm module
import init, { voronoi } from "../pkg/wasm_voronoi.js";

//set dimensions, points and colors
let npoints = 45; // <------ Increase number of points here!
let dimension = [window.innerWidth, window.innerHeight];
let points = randomPoints(npoints, 0, dimension[0], 0, dimension[1]);
let colors = points.map(() => rColor(70));

/**
 * @param {a} number, alpha value
 */

function rColor(a) {
    return [
        Math.floor(Math.random() * 255), // red
        Math.floor(Math.random() * 255), // green
        Math.floor(Math.random() * 255), // blue
        a, // alpha
    ];
}
/**
 * generate random points
 * @param {n} number, number of points
 * @param {xmin} number, smallest x coordinate
 * @param {xmax} number, largest x coordinate
 * @param {ymin} number, smallest y coordinate
 * @param {ymax} number, largest y coordinate
 */

function randomPoints(n, xmin, xmax, ymin, ymax) {
    let coors = [];
    for (let i = 0; i < n; i++) {
        let n = Math.random();
        let m = Math.random();
        let x = n * (xmax - xmin) + xmin;
        let y = m * (ymax - ymin) + ymin;
        coors.push([x, y]);
    }
    return coors;
}
/**
 * transposes the points from [[x1,x2], [x2,y2] ...]
 * to [[x1,x2], [y1,y2]...]
 * @param {pnts} points in 2d-Array
 */
function pnts2xy(pnts) {
    let x = [];
    let y = [];
    for (let p of pnts) {
        x.push(p[0]);
        y.push(p[1]);
    }
    return [x, y];
}
/**
 * Scales the points if window is resized
 * @param {pnt} 1D Array, [x,y]
 * @param {xmax_old} number, current xmax
 * @param {xmax_new} number, new xmax to scale to
 * @param {ymax_old} number, current ymax
 * @param {ymax_new} number, new ymax to scale to
 */
function rescale(pnt, xmax_old, xmax_new, ymax_old, ymax_new) {
    let x = pnt[0];
    let y = pnt[1];

    x = (x / xmax_old) * xmax_new;
    y = (y / ymax_old) * ymax_new;

    return [x, y];
}

// async main to use await syntax
async function main() {
    console.log("Start Main");
    // initialize the wasm module
    await init();
    await init("../pkg/wasm_voronoi_bg.wasm");
    // wrapper function to pass points to voroni function
    function gen_voronoi(points) {
        let [xx, yy] = pnts2xy(points);
        let xxF64 = new Float64Array(xx);
        let yyF64 = new Float64Array(yy);
        let polygons = voronoi(xxF64, yyF64, dimension[0]);
        return polygons;
    }
    // p5.js needs this function for render
    function sketch(p_five) {
        p_five.disableFriendlyErrors = true; // friendly errors = slower render time
        // rescales points if you resize the browser window
        window.onresize = () => {
            console.log("resize");
            let [w, h] = [window.innerWidth, window.innerHeight];
            for (let i = 0; i < points.length; i++) {
                points[i] = rescale(points[i], dimension[0], w, dimension[1], h);
            }
            dimension = [w, h];
            p_five.resizeCanvas(w, h);
        };
        /**
         * makes the points move
         */
        function updatePoints() {
            for (let i = 0; i < points.length; i++) {
                points[i][0] += Math.random(-5, +5); // random jitter in x-direction
                points[i][1] += -1; // move upwords in y direction

                // reset if points reach end of display-window
                if (points[i][0] > dimension[0]) {
                    points[i][0] = 0;
                }
                if (points[i][1] < 0) {
                    points[i][1] = dimension[1];
                }
            }
        }
        /**
         * uses the gen_voronoi function to generate the
         * polygons for drawing and draws them
         */
        function draw_polygons() {
            // generate voronoi polygons
            let polygons = gen_voronoi(points);

            p_five.stroke("white");
            p_five.strokeWeight(1);
            p_five.fill([255, 255, 255, 0]);
            // draws the polygons
            for (let i = 0; i < polygons.length; i++) {
                let poly = polygons[i];
                p_five.beginShape();
                for (let p of poly) {
                    p_five.vertex(p[0], p[1]);
                }
                p_five.endShape(p_five.CLOSE);
            }
        }
        /**
         * @param {points} series of x,y pairs to draw
         * @param {size} size of the stroke
         */
        function drawPoints(points, size = 10) {
            for (let i = 0; i < points.length; i++) {
                p_five.stroke(colors[i]);
                p_five.strokeWeight(30);
                p_five.point(points[i][0], points[i][1]);
                p_five.stroke("#EBFFFF");
                p_five.strokeWeight(size);
                p_five.point(points[i][0], points[i][1]);
            }
        }

        // required by p5.js
        // creates canvas in index.html and sets framerate maximum
        p_five.setup = function setup() {
            p_five.createCanvas(window.innerWidth, window.innerHeight);
            p_five.frameRate(30);
        };
        // required by p5.js
        // this is our render loop that runs infinitely
        p_five.draw = function draw() {
            p_five.background("#000616");
            //optional blur-effect but rendering is much slower
            //p_five.drawingContext.shadowBlur = 32;
            //p_five.drawingContext.shadowColor = p_five.color(207, 7, 99);
            updatePoints();
            drawPoints(points);
            draw_polygons(points);
        };
    }
    // initialize the canvas
    const myp5 = new p5(sketch, document.body);
}
// run main
main();