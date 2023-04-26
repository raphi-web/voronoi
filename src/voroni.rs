// import the library
extern crate voronoi;
use voronoi::{make_polygons, voronoi, Point};
/// this function performs the main computation of the voronoi diagram
/// - `x` reference to x coordinates
/// - `y` reference to y coordinates
/// - `box_size` the size of the square that encloses  our points
pub fn gen_voronoi(x: &Vec<f64>, y: &Vec<f64>, box_size:f64) -> Vec<Vec<Vec<f64>>> {
    // convert the coordinates to Point-Struct
    let points: Vec<Point> = x
        .into_iter()
        .zip(y)
        .map(|(xx, yy)| Point::new(*xx, *yy))
        .collect();
    // performs computation
    let diagram = voronoi(points, box_size);
    let polys = make_polygons(&diagram);
    // build the result into a format js can handle
    let mut result:Vec<Vec<Vec<f64>>> = vec![];
    for poly in polys.iter() {
        let mut po:Vec<Vec<f64>> = vec![];
        for pnt in poly.iter() {
            let x:f64 = pnt.x.into();
            let y:f64 = pnt.y.into();
            po.push(vec![x,y])
        }
        result.push(po)
    };
    result // returns result

}
