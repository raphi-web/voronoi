import init, { voronoi } from "../pkg/wasm_voronoi.js";

let npoints = 50;
let dimension = [window.innerWidth, window.innerHeight];
let points = randomPoints(npoints, 0, dimension[0], 0, dimension[1]);
let colors = points.map(() => rColor(70));

function rColor(a) {
    return [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        a,
    ];
}

async function main() {
    console.log("Start Main");
    await init();
    await init("../pkg/wasm_voronoi_bg.wasm");

    function gen_voronoi(points) {
        let [xx, yy] = pnts2xy(points);
        let xxF64 = new Float64Array(xx);
        let yyF64 = new Float64Array(yy);
        let polygons = voronoi(xxF64, yyF64, dimension[0]);
        return polygons;
    }

    function sketch(p_five) {
        window.onresize = () => {
            console.log("resize");
            let [w, h] = [window.innerWidth, window.innerHeight];
            for (let i = 0; i < points.length; i++) {
                points[i] = rescale(points[i], dimension[0], w, dimension[1], h);
            }
            dimension = [w, h];
            p_five.resizeCanvas(w, h);
        };

        function updatePoints() {
            for (let i = 0; i < points.length; i++) {
                points[i][0] += Math.random(-5, +5);
                points[i][1] += -1;

                if (points[i][0] > dimension[0]) {
                    points[i][0] = 0;
                }
                if (points[i][1] < 0) {
                    points[i][1] = dimension[1];
                }
            }
        }

        function draw_polygons() {
            let polygons = gen_voronoi(points);

            p_five.stroke("white");
            p_five.strokeWeight(1);
            p_five.fill([255, 255, 255, 0]);

            for (let i = 0; i < polygons.length; i++) {
                let poly = polygons[i];
                p_five.beginShape();
                for (let p of poly) {
                    p_five.vertex(p[0], p[1]);
                }
                p_five.endShape(p_five.CLOSE);
            }
        }

        function drawPoints(points, color = [0, 0, 0, 255], size = 10) {
            for (let i = 0; i < points.length; i++) {
                p_five.stroke(colors[i]);
                p_five.strokeWeight(30);
                p_five.point(points[i][0], points[i][1]);
                p_five.stroke("#EBFFFF");
                p_five.strokeWeight(size);
                p_five.point(points[i][0], points[i][1]);
            }
        }

        p_five.setup = function setup() {
            p_five.createCanvas(window.innerWidth, window.innerHeight);
            p_five.frameRate(30);
        };

        p_five.draw = function draw() {
            p_five.background("#000616");
            //p_five.drawingContext.shadowBlur = 32;
            //p_five.drawingContext.shadowColor = p_five.color(207, 7, 99);
            updatePoints();
            drawPoints(points);
            draw_polygons(points);
        };
    }
    const myp5 = new p5(sketch, document.body);
}

main();

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

function pnts2xy(pnts) {
    let x = [];
    let y = [];
    for (let p of pnts) {
        x.push(p[0]);
        y.push(p[1]);
    }
    return [x, y];
}

function rescale(pnt, xmax_old, xmax_new, ymax_old, ymax_new) {
    let x = pnt[0];
    let y = pnt[1];

    x = (x / xmax_old) * xmax_new;
    y = (y / ymax_old) * ymax_new;

    return [x, y];
}