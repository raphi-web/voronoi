import init, { voronoi } from "../pkg/wasm_voronoi.js";

let dimension = [window.innerWidth, window.innerHeight];
let points = randomPoints(100, 0, dimension[0], 0, dimension[1]);

console.log(points);

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
        let [xx, yy] = points;
        let xxF64 = new Float64Array(xx);
        let yyF64 = new Float64Array(yy);
        let polygons = voronoi(xxF64, yyF64, dimension[0]);
        return polygons;
    }

    let colors = points[0].map((_) => rColor(100));

    function sketch(p_five) {
        function updatePoints() {
            for (let i = 0; i < points[0].length; i++) {
                points[0][i] += Math.random(-5, +5);
                points[1][i] -= 1;

                if (points[0][i] > dimension[0]) points[0][i] = 0; // x
                if (points[1][i] < 0) points[1][i] = dimension[1]; //y
            }
        }

        function draw_polygons() {
            let polygons = gen_voronoi(points);

            p_five.stroke("black");
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
            let [xx, yy] = points;
            let length = xx.length;

            for (let i = 0; i < length; i++) {
                p_five.stroke(colors[i]);
                p_five.strokeWeight(30);
                p_five.point(xx[i], yy[i]);
                p_five.stroke(color);
                p_five.strokeWeight(size);
                p_five.point(xx[i], yy[i]);
            }
        }

        p_five.setup = function setup() {
            p_five.createCanvas(window.innerWidth, window.innerHeight);
            p_five.frameRate(30);
        };

        p_five.draw = function draw() {
            p_five.background(230);
            updatePoints();
            draw_polygons(points);
            drawPoints(points);
        };
    }
    const myp5 = new p5(sketch, document.body);
}

main();


function randomPoints(n, xmin, xmax, ymin, ymax) {
    let xx = [];
    let yy = [];
    for (let i = 0; i < n; i++) {
        let n = Math.random();
        let m = Math.random();
        let x = n * (xmax - xmin) + xmin;
        let y = m * (ymax - ymin) + ymin;
        xx.push(x);
        yy.push(y);
    }
    return [xx, yy];
}